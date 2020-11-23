import Koa from 'koa'
import Router from 'koa-router'
const router = new Router()
const app = new Koa()

import BaiduSearch from './control/baiduSearch.mjs'

class Routers {
  start() {
    router.get('/test', async (ctx, next) => {
      console.log('-------------------test')
      await next()
      ctx.response.type = 'text/html'
      ctx.response.body = '<h1>test</h1>'
    })
    router.get('/search/:seachName', function(ctx, next) {
      console.log(ctx.params)
      const baiduSearch = new BaiduSearch()
      baiduSearch.search(ctx.params)
    })
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(3000, () => {
      console.log('--------------start')
    })
  }
}

export default Routers