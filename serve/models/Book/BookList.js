const Base = require('../base.js')
class BookList extends Base {
  constructor(){
    super()
    this.modelName = 'BookList'
  }
  init() {
    this.db.define(this.modelName, {
      categoryId: {
        type: this.DataTypes.BIGINT,
        comment: '分类ID'
      },
      bookName: {
        type: this.DataTypes.STRING,
        allowNull: false,
        comment: '书名'
      },
      author: {
        type: this.DataTypes.STRING,
        allowNull: true,
        comment: '作者'
      },
      source: {
        type: this.DataTypes.STRING,
        allowNull: true,
        comment: '来源'
      }
    });
  }
}
module.exports = BookList