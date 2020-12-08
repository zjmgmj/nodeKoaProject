const BookList = require('./BookList')
const BookCategory = require('./Category')
const BookDetail = require('./Detail')
const Base = require('../base')

class Init extends Base {
  constructor() {
    super()
    this.bookCategoryModel = new BookCategory()
    this.bookListModel = new BookList()
    this.modelList = [BookList, BookCategory, BookDetail]
  }
  hasMany() {
    // const BookCategoryName = new BookCategory()
    const bookCategoryModel = this.db.models[this.bookCategoryModel.modelName]
    const bookListModel = this.db.models[this.bookListModel.modelName]
    bookCategoryModel.hasMany(this.bookListModel, {foreignKey: 'categoryId', sourceKey: 'id'})
    bookListModel.belongsTo(this.bookCategoryModel, {foreignKey: 'categoryId', targetKey: 'id'})
    console.log('----------------hasMany')
  }
}
module.exports = Init