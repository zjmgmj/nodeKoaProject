
// const Koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const serve  = require('koa-static')
const views = require('koa-views')

// const WebSocket = require('./control/webSocket')

const BookControl = require('./control/book')
const JuejinControl = require('./control/juejin')

class Routers {
  router = new Router()
  constructor(app){
    this.app = app
  }
  start() {
    this.router.get('/test', async (ctx, next) => {
      console.log('-------------------test')
      ctx.response.type = 'text/html'
      ctx.response.body = '<h1>test</h1>'
      await next()
    })
    this.router.get('/juejin', async (next) => {
      const Juejin = new JuejinControl()
      Juejin.start()
      await next()
    })
    this.router.get('/biquge/crawlingCategory', async (ctx, next) => {
      const book = new BookControl()
      book.crawlingCategory()
      await next()
    })
    this.router.get('/biquge/crawlingBookList', async (ctx, next) => {
      const book = new BookControl()
      book.crawlingBook()
      await next()
    })
    this.router.get('/biquge/crawlingBookDetail/:name', async (ctx, next) => {
      const book = new BookControl()
      const {name} = ctx.params
      book.crawlingBookDetail(name)
      await next()
    })
    this.router.get('/destroyAll/:modelName', async (ctx, next) => {
      const book = new BookControl()
      const {modelName} = ctx.params
      book.BookList.destroyAll(modelName)
      await next()
    })
    this.router.get('/websocket', async (ctx, next) => {
      await ctx.render('./webSocket/test.html')
      await next()
    })
    // this.router.get('/socket',async (ctx, next) => {
    //   console.log(ctx)
    //   await next()
    // })
    // this.app.use((ctx, next) => {
    //   console.log(ctx.href)
    //   next()
    // })
    this.app.use(views(path.resolve(__dirname, 'view'), {
      map: { html: 'ejs' }
    })) // 模板引擎
    this.app.use(serve(path.resolve(__dirname, 'view'))) // 静态文件
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

module.exports = Routers