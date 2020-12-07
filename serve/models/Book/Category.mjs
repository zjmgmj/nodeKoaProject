import Base from '../base.mjs'

class Category extends Base {
  constructor(){
    super()
    // this.db = sequelize
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
export default Category