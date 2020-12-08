const {DataTypes} = require('sequelize')
class Detail {
  sequelize;
  constructor(sequelize){
    this.sequelize = sequelize
  }
  init() {
    this.sequelize.define('BookDetail', {
      bookId: {
        type: DataTypes.BIGINT,
        comment: '书籍ID'
      },
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '标题'
      }
    });
  }
}
module.exports = Detail