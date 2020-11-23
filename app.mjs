// import Koa from 'koa'
// import Router from 'koa-router'
// const app = new Koa()
// const router = new Router()

import Routers from './serve/router.mjs'
const router = new Routers()
console.log('routers', router)
router.start()



// console.log('app', app)