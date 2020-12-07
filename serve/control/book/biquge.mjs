import Reptile from '../Reptile.mjs'
import CategoryModel from '../../models/Book/Category.mjs'
class Biquge extends Reptile {
  constructor() {
    super()
    this.launchConfig={
      devtools: true, // 开启开发者控制台
      headless: true, // 开启浏览器界面
      defaultViewport: {
        width: 1500,
        height: 900
      }
    }
    this.CategoryModel = new CategoryModel(this.db)
  }
  async crawlingCategory() {
    // 获取分类
    this.url = 'http://www.xbiquge.la/'
    await this.init()
    const categoryList = await this.page.$$eval('.nav li a', async (elemets) => {
      console.log(elemets)
      const list = []
      return new Promise(resolve => {
        for(let i=2; i<elemets.length-2; i++){
          const el = elemets[i]
          list.push({
            categoryName: el.outerText,
            source: el.href
          })
        }
        resolve(list)
      })
    })
    this.CategoryModel.add(categoryList, this.CategoryModel.modelName)
  }
  getData() {
    // this.page
  }
  async start() {}
}

export default Biquge