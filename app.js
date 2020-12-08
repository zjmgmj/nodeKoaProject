const Routers = require('./serve/router.js')
const DbModel = require('./serve/models/Init')
/**
 * 初始化数据库
 */
const dbModel = new DbModel()
dbModel.init()

// console.log('routers', router)
Routers.start()