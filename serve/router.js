const BookControl = require('./control/book')
const JuejinControl = require('./control/juejin')
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
    router.get('/juejin', async () => {
      const Juejin = new JuejinControl()
      Juejin.start()
    })
    router.get('/biquge/crawlingCategory', async () => {
      const book = new BookControl()
      book.crawlingCategory()
    })
    router.get('/biquge/crawlingBookList', async () => {
      const book = new BookControl()
      book.crawlingBook()
    })
    router.get('/biquge/crawlingBookDetail', async () => {
      const book = new BookControl()
      book.crawlingBookDetail()
    })
    router.get('/destroyAll/:modelName', async (ctx) => {
      const book = new BookControl()
      const {modelName} = ctx.params
      book.BookList.destroyAll(modelName)
    })
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(3000, () => {
      console.log('--------------start')
    })
  }
}
