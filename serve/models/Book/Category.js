const Base = require('../base')

class Category extends Base {
  constructor(){
    super()
    this.modelName = 'BookCategory'
  }
  init() {
    this.db.define(this.modelName, {
      categoryName: {
        type: this.DataTypes.STRING,
        allowNull: false,
        comment: '分类名称'
      },
      source: {
        type: this.DataTypes.STRING,
        allowNull: true,
        comment: '来源'
      }
    });
  }
}
module.exports = Category