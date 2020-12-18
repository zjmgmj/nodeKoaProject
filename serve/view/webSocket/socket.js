// if (!window.WebSocket) return false
localStorage.debug = 'socket.io-client:socket'
const paramStrList = location.search.replace(/\?/g, '').split('&')
const params = {}
paramStrList.map(item => {
  const list = item.split('=')
  params[list[0]] = list[1]
})

// const host = 'http://3616g7m803.zicp.vip'
const host = '/'

const socket = io(host, {
  path: '/socket',
  transports: ['websocket']
})

socket.emit('login', JSON.stringify({userId: params.userId, userName: params.userName})) // 发送

socket.on('disconnect', () => {
  console.log('disconnect')
})

const sendMessage = (message) => {
  socket.emit('message', JSON.stringify(message)) // 发送
}

socket.on('message', res => { // 监听接收时
  const data = JSON.parse(res)
  const pDom = document.createElement('div')
  pDom.textContent = data.message
  document.getElementById('message').appendChild(pDom)
})

document.getElementById('send').onclick= function () {
  params.message = document.getElementById('sendVal').value
  sendMessage(params)
}
document.getElementById('signOut').onclick= function () {
  socket.disconnect()
}
document.getElementById('login').onclick= function () {
  socket.connect()
}