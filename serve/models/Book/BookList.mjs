import sequelizePkg from 'sequelize'
const {DataTypes} = sequelizePkg

class BookList {
  sequelize;
  constructor(sequelize){
    this.sequelize = sequelize
  }
  init() {
    this.sequelize.define('BookList', {
      categoryId: {
        type: DataTypes.BIGINT,
        comment: '分类ID'
      },
      bookId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        comment: '书籍ID'
      },
      bookName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '书名'
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '作者'
      }
    });
  }
}
export default BookList