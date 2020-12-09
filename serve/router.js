const BookControl = require('./control/book/biquge')
const JuejinControl = require('./control/juejin/Control')
const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const app = new Koa()

module.exports = {
  start() {
    router.get('/test', async (ctx, next) => {
      console.log('-------------------test')
      await next()
      ctx.response.type = 'text/html'
      ctx.response.body = '<h1>test</h1>'
    })
    router.get('/juejin', async (ctx, next) => {
      await next()
      const Juejin = new JuejinControl()
      Juejin.start()
    })
    router.get('/biquge/crawlingCategory', async (ctx, next) => {
      await next()
      const book = new BookControl()
      book.crawlingCategory()
    })
    router.get('/biquge/crawlingBookList', async (ctx, next) => {
      await next()
      const book = new BookControl()
      book.crawlingBookList()
    })
    // router.get('/search/:searchName', async (ctx, next) => {
    //   await next()
    //   const params = ctx.params
    //   ctx.response.type = 'text/html'
    //   ctx.response.body = `${JSON.stringify(params)}`
    //   const Juejin = new JuejinControl()
    //   Juejin.start(params)
    // })
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(3000, () => {
      console.log('--------------start')
    })
  }
}
