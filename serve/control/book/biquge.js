const Reptile = require('../Reptile')
const CategoryModel = require('../../models/Book/Category')

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
    await this.init('http://www.xbiquge.la/')
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

module.exports = Biquge