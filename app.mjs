// import Koa from 'koa'
// import Router from 'koa-router'
// const app = new Koa()
// const router = new Router()

import Routers from './serve/router.mjs'
import DbModel from './serve/models/Init.mjs'
const router = new Routers()

/**
 * 初始化数据库
 */
const dbModel = new DbModel()
dbModel.init()

console.log('routers', router)
router.start()



// console.log('app', app)