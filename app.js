
const Koa = require('koa')
const http = require('http')
const Routers = require('./serve/router.js')
const DbModel = require('./serve/models/Init')
const app = new Koa()
const server = http.createServer(app.callback())
/**
 * 初始化数据库
 */
const dbModel = new DbModel()
dbModel.init()

const routers = new Routers(app)
routers.start()

const Socket = require('./serve/control/socketIo')
const socket = new Socket(server)
socket.connection()

server.listen(3000, () => {
  console.log('--------------listen')
})

// const WebSocket = require('./serve/control/webSocket')
// const ws = new WebSocket()
// ws.createServer()

