const Reptile = require('../Reptile')
const CategoryModel = require('../../models/Book/Category')
const BookList = require('../../models/Book/BookList')
const BookDetail = require('../../models/Book/Detail')
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
    this.BookDetail = new BookDetail()
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
  async openBookDetail(item) {
    await this.init(item.source)
    const data = await this.page.$eval('#content', (el) => {
      return new Promise(resolve => {
        resolve(el.outerText)
      })
    })
    return data
  }
  async openBookMenu (item) {
    await this.init(item.source)
    const list = await this.page.$$eval('#list dl dd a', elemets => {
      return new Promise (resolve => {
        const list = []
        for(let i=0; i<elemets.length; i++){
          const el = elemets[i]
          list.push({
            source: el.href,
            name: el.outerText
          })
        }
        resolve(list)
      })
    })
    let contentList = []
    for(let i=0; i<list.length; i++){
      const content = await this.openBookDetail(list[i])
      contentList.push({
        name: list[i].name,
        bookId: item.id,
        content
      })
      if(contentList.length > 10) {
        this.BookDetail.add(contentList, this.BookDetail.modelName)
        contentList = []
      }
    }
  }
  async crawlingBookDetail(bookName) { // 爬取详情
    const bookList = await this.getBook({bookName})
    this.openBookMenu(bookList[0])
    // for(let i=0; i<bookList.length; i++){
    //   const item = bookList[i]
    //   this.openBookMenu(item)
    // }
  }
  getCategory(params) {
    return this.CategoryModel.findAll(params, this.CategoryModel.modelName)
  }
  getBook(params){
    return this.BookList.findAll(params, this.BookList.modelName)
  }
}

module.exports = Biquge