class Socket {
  users = {}
  USER_STATUS = ['ONLINE', 'OFFLINE']
  options = {
    path: '/socket',
    serveClient: false,
    transports: ['websocket']
  }
  constructor(server){
    this.io = require('socket.io')(server, this.options)
  }
  connection() {
    this.io.on('connection', socket => {

      socket.on('login', res => { // 登录
        const data = JSON.parse(res)
        console.log(data)
        socket.userName = data.userName
        this.users[data.userName] = {
          userId: data.userId,
          socketId: socket.id,
          status: this.USER_STATUS[0]
        }
      })

      socket.on('message', res => {
        const data = JSON.parse(res)
        if(!this.users[data.toName] || this.users[data.toName].status === 'OFFLINE') {
          socket.emit('message', JSON.stringify({message: '不在线', status: this.USER_STATUS[1]}))
          return false
        }
        socket.to(this.users[data.toName].socketId).emit('message', res)
        socket.emit('message', res)
      })

      socket.on('disconnect', () => {
        if(this.users[socket.userName]) this.users[socket.userName].status = this.USER_STATUS[1]
      })
    })
  }
}
module.exports = Socket