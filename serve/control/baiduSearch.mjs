import puppeteer from 'puppeteer'
import chalk from 'chalk'

class BaiduSearch {
  async search (params) {
    const browser = await puppeteer.launch({devtools: true})
    const page = await browser.newPage()
    page.on('console', msg => {
      console.dir(msg.text())
    })
    await page.goto('https://baidu.com')

    console.log('params', params)

    // await page.screenshot({path: 'baidu.png'})
    // await browser.close()
    return this
  }
}

export default BaiduSearch