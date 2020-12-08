const {DataTypes} = require('sequelize')
const db = require('../database/db')

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
module.exports = Base