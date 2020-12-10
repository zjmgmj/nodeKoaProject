const Reptile = require('../Reptile')
const CategoryModel = require('../../models/Book/Category')
const BookList = require('../../models/Book/BookList')
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
    this.CategoryModel = new CategoryModel()
    this.BookList = new BookList()
  }
  async crawlingCategory() {
    // 获取分类
    await this.init('http://www.xbiquge.la/')
    const categoryList = await this.page.$$eval('.nav li a', async (elemets) => {
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
  getCategory(params) {
    return this.CategoryModel.findAll(params, this.CategoryModel.modelName)
  }
  async crawlingBookList() {
    // 爬取名称
    const categoryList = await this.getCategory()
    const bookList = []
    // const newList = [categoryList[0], categoryList[1]]
    const promiseList = []
    for(let i=0;i<categoryList.length;i++){
      await this.init(categoryList[i].source)
      promiseList.push(new Promise(resolve => {
          this.page.$$eval('#newscontent li span.s2 a', elemets => {
            const list = []
            return new Promise(resolve => {
              for (let i=0; i<elemets.length; i++) {
                const el = elemets[i]
                list.push({
                  bookName: el.outerText,
                  source: el.href
                })
              }
              resolve(list)
            })
          }).then(list => {
            resolve({list, id:categoryList[i].id})
          })
        })
      )
    }
    Promise.all(promiseList).then((res) => {
      res.map(({list, id}) => {
        for(let i=0; i<list.length; i++){
          list[i].categoryId = id
        }
        bookList.push(...list)
      })
      this.BookList.add(bookList, this.BookList.modelName)
    }).catch(err => {
      console.error(err)
    })
  }
  getData() {
    // this.page
  }
  async start() {}
}

module.exports = Biquge