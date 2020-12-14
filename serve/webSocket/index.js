const ws = require('nodejs-websocket')

class WebSocket {
  createServer(){
    const server = ws.createServer(connection => {
      connection.on('text', res => {
        console.log('发送消息', res)
      })
      connection.on('connect', code => {
        console.log('开启连接', code)
      })
      connection.on('close', code => {
        console.log('关闭连接', code)
      })
      connection.on('error', code => {
        console.log('异常关闭', code)
      })
    }).listen(3001)
    return server
  }
}

module.exports = WebSocket