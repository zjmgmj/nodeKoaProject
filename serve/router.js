
const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const serve  = require('koa-static')
const views = require('koa-views')

const WebSocket = require('./webSocket')
const fs = require('fs')
const router = new Router()
const app = new Koa()

const BookControl = require('./control/book')
const JuejinControl = require('./control/juejin')

module.exports = {
  start() {
    router.get('/test', async (ctx, next) => {
      console.log('-------------------test')
      ctx.response.type = 'text/html'
      ctx.response.body = '<h1>test</h1>'
      await next()
    })
    router.get('/juejin', async (next) => {
      const Juejin = new JuejinControl()
      Juejin.start()
      await next()
    })
    router.get('/biquge/crawlingCategory', async (ctx, next) => {
      const book = new BookControl()
      book.crawlingCategory()
      await next()
    })
    router.get('/biquge/crawlingBookList', async (ctx, next) => {
      const book = new BookControl()
      book.crawlingBook()
      await next()
    })
    router.get('/biquge/crawlingBookDetail/:name', async (ctx, next) => {
      const book = new BookControl()
      const {name} = ctx.params
      book.crawlingBookDetail(name)
      await next()
    })
    router.get('/destroyAll/:modelName', async (ctx, next) => {
      const book = new BookControl()
      const {modelName} = ctx.params
      book.BookList.destroyAll(modelName)
      await next()
    })
    router.get('/websocket', async (ctx, next) => {
      const ws = new WebSocket()
      ws.createServer()
      await ctx.render('./webSocket/test.html')
      await next()
    })
    
    app.use(views(path.resolve(__dirname, 'view'), {
      map: { html: 'ejs' }
    })) // 模板引擎
    app.use(serve(path.resolve(__dirname, 'view'))) // 静态文件
    app.use(router.routes())
    app.use(router.allowedMethods())
    app.listen(3000, () => {
      console.log('--------------listen')
    })
  }
}
