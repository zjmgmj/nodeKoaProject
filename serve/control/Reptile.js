const puppeteer = require('puppeteer')
// const db = require('../database/db')
class Reptile {
  browser;
  page;
  launchConfig;
  // url;
  cookie;
  cookieStr;
  constructor() {
    // this.db = db
  }
  async init(url) {
    this.browser = await puppeteer.launch(this.launchConfig) 
    this.page = await this.browser.newPage()
    if(this.cookieStr) {
      await this.setCookie(this.cookieStr, '.juejin.cn')
    }
    await this.page.goto(url)
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
    await this.page.setRequestInterception(true) // 启用请求拦截器
    if(this.cookieStr) {
      await this.page.on('request', request => {
        request.continue([{headers: {cookie: this.cookieStr}}]) // 修改头文件
      })
    }
  }
  async setCookie(cookiesStr, domain) {
    const page = this.page
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
  async start (params) {
    await this.init()
  }
}

module.exports = Reptile
// export default Reptile