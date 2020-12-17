// if (!window.WebSocket) return false
localStorage.debug = 'socket.io-client:socket'
const paramStrList = location.search.replace(/\?/g, '').split('&')
const params = {}
paramStrList.map(item => {
  const list = item.split('=')
  params[list[0]] = list[1]
})

const socket = io({
  path: '/socket',
  transports: ['websocket']
})

socket.on('connection', () => { // 监听连接时
  console.log('---', socket.id)
  socket.emit('new message', 'hello') // 发送
})

socket.on('disconnect', () => {
  console.log('disconnect')
})

const sendMessage = (message) => {
  socket.emit('message', JSON.stringify(message)) // 发送
}

socket.on('message', res => { // 监听接收时
  console.log('message', res)
  const data = JSON.parse(res)
  const pDom = document.createElement('div')
  pDom.textContent = data.message
  document.getElementById('message').appendChild(pDom)
})

document.getElementById('send').onclick= function () {
  params.message = document.getElementById('sendVal').value
  sendMessage(params)
}