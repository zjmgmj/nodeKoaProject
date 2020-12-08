const Juejin = require('../../models/Juejin')
const Reptile = require('../Reptile')
class Control extends Reptile {
  constructor() {
    super()
    this.baseApi = 'https://api.juejin.cn'
    this.apiList = [
      'content_api/v1/article/detail',
      'recommend_api/v1/article/recommend_all_feed'
    ]
    this.launchConfig={
      devtools: false, // 开启开发者控制台
      headless: false, // 开启浏览器界面
      defaultViewport: {
        width: 1500,
        height: 900
      }
    }
    // this.url = 'https://juejin.cn/'
    this.cookieStr = 'MONITOR_WEB_ID=6bc745dc-326e-4e9b-88cb-2bb7a6d7a0d2; passport_csrf_token=d384633af8f286679dab8385390d752a; n_mh=6vELKnfA5uzIYntn5feMIiOtxZfci30gvZxOq-3V0sw; sid_guard=7aa16b91472d4e7a9dc3acfffe9e2a33%7C1605862975%7C5184000%7CTue%2C+19-Jan-2021+09%3A02%3A55+GMT; uid_tt=456ff4b3962bd35ee0f88c520fbd02a5; uid_tt_ss=456ff4b3962bd35ee0f88c520fbd02a5; sid_tt=7aa16b91472d4e7a9dc3acfffe9e2a33; sessionid=7aa16b91472d4e7a9dc3acfffe9e2a33; sessionid_ss=7aa16b91472d4e7a9dc3acfffe9e2a33; _ga=GA1.2.558510534.1606465177'
  }
  getData() {
    return new Promise(resolve => {
      this.page.on('response', res => { // 监听请求收到响应的时候触发
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
      this.page.reload()
    })
  }
  async start() {
    await this.init('https://juejin.cn/')
    try {
      const res = await this.getData()
      const {data} = JSON.parse(res)
      console.log(data)
      if(data){
        const JuejinDb = new Juejin(this.db)
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
    } catch (error) {
      console.log(error)
    }
  }
}
// export default Control
module.exports = Control