import Koa from 'koa'
import Router from 'koa-router'
import JuejinControl from './control/juejin/Control.mjs'
import BookControl from './control/book/biquge.mjs'
const router = new Router()
const app = new Koa()

class Routers {
  start() {
    router.get('/test', async (ctx, next) => {
      console.log('-------------------test')
      await next()
      ctx.response.type = 'text/html'
      ctx.response.body = '<h1>test</h1>'
    })
    router.get('/biquge/crawlingCategory', async (ctx, next) => {
      await next()
      const book = new BookControl()
      book.crawlingCategory()
    })
    router.get('/search/:searchName', async (ctx, next) => {
      await next()
      const params = ctx.params
      ctx.response.type = 'text/html'
      ctx.response.body = `${JSON.stringify(params)}`
      const Juejin = new JuejinControl()
      Juejin.start(params)
    })
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(3000, () => {
      console.log('--------------start')
    })
  }
}

export default Routers