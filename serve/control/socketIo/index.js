class Socket {
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
      socket.on('message', data => {
        console.log('------------new Message', data)
        this.io.emit('message', data)
      })
    })
    // this.server.listen(3001)
  }
}
module.exports = Socket