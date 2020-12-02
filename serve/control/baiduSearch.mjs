import puppeteer from 'puppeteer'
// import chalk from 'chalk'

class BaiduSearch {
  #browser;
  #page;
  #launchConfig;
  #url;
  #cookie;
  #cookieStr;
  constructor({launchConfig, url}) {
    this.#url = url || 'https://baidu.com'
    this.#launchConfig = launchConfig || {
      devtools: true, // 开启开发者控制台
      headless: false, // 开启浏览器界面
      defaultViewport: {
        width: 1920,
        height: 900
      }
    }
    this.#cookieStr = 'MONITOR_WEB_ID=6bc745dc-326e-4e9b-88cb-2bb7a6d7a0d2; passport_csrf_token=d384633af8f286679dab8385390d752a; n_mh=6vELKnfA5uzIYntn5feMIiOtxZfci30gvZxOq-3V0sw; sid_guard=7aa16b91472d4e7a9dc3acfffe9e2a33%7C1605862975%7C5184000%7CTue%2C+19-Jan-2021+09%3A02%3A55+GMT; uid_tt=456ff4b3962bd35ee0f88c520fbd02a5; uid_tt_ss=456ff4b3962bd35ee0f88c520fbd02a5; sid_tt=7aa16b91472d4e7a9dc3acfffe9e2a33; sessionid=7aa16b91472d4e7a9dc3acfffe9e2a33; sessionid_ss=7aa16b91472d4e7a9dc3acfffe9e2a33; _ga=GA1.2.558510534.1606465177'
  }
  async init() {
    this.#browser = await puppeteer.launch(this.#launchConfig) 
    this.#page = await this.#browser.newPage()
  }
  async setCookie(cookiesStr) {
    const page = this.#page
    const expires = 1611046975918
    const domain = '.juejin.cn'
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
  async start (params) {
    await this.init()
    try{
      await this.setCookie(this.#cookieStr)
      await this.#page.goto(this.#url)
      await this.#page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
      await this.#page.setRequestInterception(true)
      await this.#page.on('request', request => {
        request.continue([{headers: {cookie: this.#cookieStr}}])
      })
      
      const resData = await this.#page.$$eval('.entry-list .item .title', async (elemets) => {
        console.log(elemets)
        const list = []
        return new Promise(resolve => {
          for(let i=0; i<elemets.length; i++){
            const el = elemets[i]
            if(!el.href) continue
            list.push({
              title: el.outerText,
              href: el.href
            })
          }
          console.log(list)
          resolve(list)
        })
      })
      console.log(resData)
      // await browser.close()
    }catch(e){
      console.log(e)
    }
  }
}

export default BaiduSearch