// if (!window.WebSocket) return false
const ws = new WebSocket("ws://localhost:3001")
ws.onopen = () => {
  console.log('启动')
  sendMessage('启动ws')
}

ws.onmessage = (event) => {
  console.log('接收服务器消息', event)
}

ws.onclose = () => {
  console.log('关闭服务器')
}

ws.onerror = () => {
  console.log('连接出错')
}

sendMessage = (info) => {
  ws.send('123')
}

document.getElementById('send').onclick=() => {
  console.log('send')
  sendMessage()
}