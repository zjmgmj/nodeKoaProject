import sequelize from 'sequelize'
import db from '../database/db.mjs'
const {DataTypes} = sequelize

class Base {
  constructor(){
    this.DataTypes = DataTypes
    this.db = db
  }
  add(params, modelName) {
    const modelDb = this.db.models[modelName]
    if(params.length){
      modelDb.bulkCreate(params)
    } else {
      modelDb.create(params)
    }
  }
}
export default Base