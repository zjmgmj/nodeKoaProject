// const {DataTypes} = require('sequelize')
const Base = require('../base')
class Detail extends Base {
  constructor(){
    super()
    this.modelName = 'BookDetail'
  }
  init() {
    this.db.define(this.modelName, {
      // bookId: {
      //   type: this.DataTypes.BIGINT,
      //   comment: '书籍ID'
      // },
      id: {
        type: this.DataTypes.BIGINT,
        autoIncrement: false,
        primaryKey: true
      },
      name: {
        type: this.DataTypes.STRING,
        allowNull: false,
        comment: '标题'
      },
      content: {
        type: this.DataTypes.TEXT,
        comment: '详情'
      }
    });
  }
}
module.exports = Detail