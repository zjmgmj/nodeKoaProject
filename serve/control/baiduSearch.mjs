import puppeteer from 'puppeteer'
// import chalk from 'chalk'

class BaiduSearch {
  #browser;
  #page;
  #launchConfig;
  #url;
  constructor({launchConfig, url}) {
    this.#url = url || 'https://baidu.com'
    this.#launchConfig = launchConfig || {
      devtools: true, // 开启开发者控制台
      headless: false // 开启浏览器界面
    }
  }
  async init() {
    this.#browser = await puppeteer.launch(this.#launchConfig) 
    this.#page = await this.#browser.newPage()
  }
  async start (params) {
    await this.init()
    console.log(this.#url)
    try{
      await this.#page.goto(this.#url)
      await this.#page.setRequestInterception(true)
      
      // await this.#page.type('.search-input', params.searchName)
      // const searchBtn = await this.#page.$('.search-icon')
      // searchBtn.click()
      const res = await this.#page.$$eval('.item', res => {
        return new Promise(resolve => {
          console.log(res)
          resolve(res)
        })
      })
      for(let i=0; i<res.length; i++){
        const ele = res[i]
        console.log(ele)
        console.log(ele.valueOf())
      }
      // const elements = await this.#page.$$('.item')
      // console.log(elements)
      // for(let i=0; i<elements.length; i++){
      //   const ele = elements[i]
      //   const titleEle = await ele.$('.title')
      //   ele.page
      //   console.log(titleEle)
      // }
      // await browser.close()
    }catch(e){
      console.log(e)
    }
  }
}

export default BaiduSearch