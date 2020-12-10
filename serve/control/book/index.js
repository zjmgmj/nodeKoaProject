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
  async crawlingBookList(item){
    await this.init(item.source)
    // await this.page.waitForNavigation()
    const {list, url} = await this.page.$$eval('#newscontent .l li span.s2 a', elemets => {
      const list = []
      return new Promise(resolve => {
        for (let i=0; i<elemets.length; i++) {
          const el = elemets[i]
          if(!el.href) continue
          list.push({
            bookName: el.outerText,
            source: el.href
          })
        }
        resolve({list, url: document.querySelector('#pagelink .next').href})
      })
    })
    for(let i=0; i<list.length; i++){
      list[i].categoryId = item.id
    }
    this.BookList.add(list, this.BookList.modelName)
    if(item.source !== url) {
      item.source = url
      const timeOut = setTimeout(() => {
        this.crawlingBookList(item)
        clearTimeout(timeOut)
      }, 3000)
    }   
  }
  async crawlingBook() {
    // 爬取名称
    const categoryList = await this.getCategory()
    for(let i=0;i<categoryList.length;i++){
      this.crawlingBookList(categoryList[i])
    }
  }
  async crawlingBookDetail() {
    const bookList = await this.getBook({bookName: '神秀之主'})
    console.log(bookList)
  }
  getCategory(params) {
    return this.CategoryModel.findAll(params, this.CategoryModel.modelName)
  }
  getBook(params){
    return this.BookList.findAll(params, this.BookList.modelName)
  }
}

module.exports = Biquge