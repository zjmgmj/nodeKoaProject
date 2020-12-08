const sequelize = require('sequelize')
const config = require('./config.js')

const db = new sequelize.Sequelize(config.database, config.username, config.pw, { 
  host: config.host, 
  dialect: config.dialect, 
  pool: {
    max: 5, // 连接池最大连接数量
    min: 0,
    idle: 10000
  },
  logging: true,
  define: {
    freezeTableName: true
  }
})

module.exports = db