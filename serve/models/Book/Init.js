const BookList = require('./BookList')
const BookCategory = require('./Category')
const BookDetail = require('./Detail')
const Base = require('../base')

class Init extends Base {
  constructor() {
    super()
    this.bookCategoryModel = new BookCategory()
    this.bookListModel = new BookList()
    this.BookDetailModel = new BookDetail()
    this.modelList = [BookList, BookCategory, BookDetail]
  }
  setHasMany({child, father, foreignKey, sourceKey}) {
    // 一对多关联
    const childModel = this.db.models[child]
    const fatherModel = this.db.models[father]
    fatherModel.hasMany(childModel, {foreignKey, sourceKey})
    childModel.belongsTo(fatherModel, {foreignKey, targetKey: sourceKey})
  }
  hasMany() {
    // 关联
    this.setHasMany({
      child: this.bookListModel.modelName,
      father: this.bookCategoryModel.modelName,
      foreignKey: 'categoryId',
      sourceKey: 'id'
    })
    this.setHasMany({
      child: this.BookDetailModel.modelName,
      father: this.bookListModel.modelName,
      foreignKey: 'bookId',
      sourceKey: 'id'
    })
  }
}
module.exports = Init