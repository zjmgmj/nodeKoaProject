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
    console.log('add success')
  }
  async findAll(where, modelName) { // 查询
    const modelDb = this.db.models[modelName]
    const config = {raw: true}
    if(where) config.where = config
    const list = await modelDb.findAll(config)
    console.log('findAll success')
    return list
  }
  async destroy(where, modelName) { // 删除
    const modelDb = this.db.models[modelName]
    const config = {raw: true}
    if(where) config.where = config
    const list = await modelDb.destroy(config)
    console.log('destroy success')
    return list
  }
  async destroyAll(modelName) { // 删除所有
    const modelDb = this.db.models[modelName]
    await modelDb.destroy({truncate: true})
    console.log('destroyAll success')
    return {code: 200}
  }
}
module.exports = Base