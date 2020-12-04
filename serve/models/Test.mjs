import sequelizePkg from 'sequelize'
const {DataTypes} = sequelizePkg
class Test {
  sequelize;
  constructor(sequelize) {
    this.sequelize = sequelize
  }
  createModel() {
    this.sequelize.define('Test', {
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      age: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      content: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    })
  } 
}
export default Test