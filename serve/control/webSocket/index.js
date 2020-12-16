const ws = require('nodejs-websocket')

class WebSocket {
  from = null
  to = null
  connections = []
  keys = []
  constructor(){}
  createServer(){
    let count = 0
    const server = ws.createServer(connection => {
      console.log('key', connection.key)
      connection.on('text', res => {
        if(!res) return false
        const resData = JSON.parse(res)
        // console.log(server)
        // server.connections
        // let receiveConn = this.connections.find(item => { // 查找是否连接接收方
        //   return item.id === `${resData.to}-${resData.from}`
        // })
        // let sendConn = this.connections.find(item => { // 查找是否又发送方
        //   return item.id === `${resData.from}-${resData.to}`
        // })
        // if(!sendConn) { // 保存连接
        //   sendConn = {
        //     id: `${resData.from}-${resData.to}`,
        //     connection
        //   }
        //   this.connections.push(sendConn)
        // } else {
        //   sendConn.connection = connection
        // }
        console.log('接收客户端消息', res)
        // count ++ 
        // // const resMessage = JSON.stringify(resData)
        // if(receiveConn) receiveConn.connection.sendText(res)
        connection.sendText(res)
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