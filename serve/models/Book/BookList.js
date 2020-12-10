const Base = require('../base')
class BookList extends Base {
  constructor(){
    super()
    this.modelName = 'BookList'
  }
  init() {
    this.db.define(this.modelName, {
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