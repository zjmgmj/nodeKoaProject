import puppeteer from 'puppeteer'
// import chalk from 'chalk'

class BaiduSearch {
  async search (params) {
    const browser = await puppeteer.launch({devtools: true})
    const page = await browser.newPage()
    // page.on('console', msg => {
    //   console.dir(msg.text())
    // })
    // const {searchName} = params
    console.log('params', params)
    await page.goto('https://baidu.com')
    // console.log(page.$('.s_ipt'))
    // page.$('.s_ipt').value = searchName
    await page.type('.s_ipt', params.searchName)
    const searchBtn = await page.$('#su')
    searchBtn.click()
    // element.value = params.searchName
    // await page.screenshot({path: 'baidu.png'})
    // await browser.close()
    return this
  }
}

export default BaiduSearch