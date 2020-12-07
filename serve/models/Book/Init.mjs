import BookList from './BookList.mjs'
import BookCategory from './Category.mjs'
import BookDetail from './Detail.mjs'
import Base from '../base.mjs'
class Init extends (Base) {
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
export default Init