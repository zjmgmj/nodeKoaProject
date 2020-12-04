import sequelizePkg from 'sequelize'
const {DataTypes} = sequelizePkg
class Juejin {
  sequelize;
  constructor(sequelize) {
    // super()
    this.sequelize = sequelize
  }
  init() {
    this.sequelize.define('Juejin', {
      articleId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title: {
        type: DataTypes.TEXT
      },
      briefContent: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    })
  }
  add(params) {
    const Juejin = this.sequelize.models.Juejin
    if(params.length){
      Juejin.bulkCreate(params)
    } else {
      Juejin.create(params)
    }
  }
}
export default Juejin