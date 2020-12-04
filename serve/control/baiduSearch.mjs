import puppeteer from 'puppeteer'
// import Fs from './fs.mjs'
// import fs from 'fs'
import Juejin from '../models/Juejin.mjs'
// import chalk from 'chalk'

class BaiduSearch {
  #browser;
  #page;
  #launchConfig;
  #url;
  #cookie;
  #cookieStr;
  baseApi = 'https://api.juejin.cn'
  apiList = [
    'content_api/v1/article/detail',
    'recommend_api/v1/article/recommend_all_feed'
  ]
  #db;
  constructor({launchConfig={
    devtools: false, // 开启开发者控制台
    headless: false, // 开启浏览器界面
    defaultViewport: {
      width: 1500,
      height: 900
    }
  }, url, cookieStr, db}) {
    // super()
    this.#url = url || 'https://baidu.com'
    this.#launchConfig = {}
    this.#cookieStr = cookieStr
    this.#db = db
  }
  async init() {
    this.#browser = await puppeteer.launch(this.#launchConfig) 
    this.#page = await this.#browser.newPage()
    await this.setCookie(this.#cookieStr, '.juejin.cn')
    await this.#page.goto(this.#url)
    await this.#page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
    await this.#page.setRequestInterception(true) // 启用请求拦截器
    await this.#page.on('request', request => {
      request.continue([{headers: {cookie: this.#cookieStr}}]) // 修改头文件
    })
  }
  async setCookie(cookiesStr, domain) {
    const page = this.#page
    const expires = Date.now() + 3600 * 100000
    const path = '/'
    let cookies = cookiesStr.split(';').map(pair=>{
      let name = pair.trim().slice(0,pair.trim().indexOf('='))
      let value = pair.trim().slice(pair.trim().indexOf('=')+1)
      return {name, value, domain, path, expires}
    });
    await Promise.all(cookies.map(pair=>{
        return page.setCookie(pair)
    }))
  }
  // https://api.juejin.cn/content_api/v1/article/detail
  getData() {
    return new Promise(resolve => {
      this.#page.on('response', res => { // 监听请求收到响应的时候触发
        const url = res.url()
        const isUrl = this.apiList.find(item => {
          return url.indexOf(item) !== -1
        })
        if(isUrl) {
          const resData = res.text()
          resData.then(data => {
            resolve(data)
          })
        }
      })
      this.#page.reload()
    })
  }
  async start (params) {
    await this.init()
    try{
      const res = await this.getData()
      const {data} = JSON.parse(res)
      console.log(data)
      if(data){
        const JuejinDb = new Juejin(this.#db)
        const list = []
        data.map(item => {
          const info = item.item_info
          if(info.article_id) {
            const articleInfo = info.article_info
            const data = {
              articleId: info.article_id,
              title: articleInfo.title,
              briefContent: articleInfo.brief_content
            }
            list.push(data)
          }
        })
        console.log(JSON.stringify(list))
        JuejinDb.add(list)
      }
      
      
      
      // const resData = await this.#page.$$eval('.entry-list .item .title', async (elemets) => {
      //   // 可在页面执行js
      //   const list = []
      //   return new Promise(resolve => {
      //     for(let i=0; i<elemets.length; i++){
      //       const el = elemets[i]
      //       if(!el.href) continue
      //       list.push({
      //         title: el.outerText,
      //         href: el.href
      //       })
      //     }
      //     // console.log(list)
      //     resolve(list)
      //   })
      // })
      // console.log(resData)
      // await browser.close()
    }catch(e){
      console.log(e)
    }
  }
}

export default BaiduSearch