// if (!window.WebSocket) return false
const paramStrList = location.search.replace(/\?/g, '').split('&')
const params = {}
paramStrList.map(item => {
  const list = item.split('=')
  params[list[0]] = list[1]
})
const ws = new WebSocket("ws://localhost:3001")
ws.onopen = () => {
  console.log('启动')
  params.message = ''
  sendMessage(params)
}

ws.onmessage = (event) => {
  console.log('接收服务器消息', event)
  const data = JSON.parse(event.data)
  const pDom = document.createElement('div')
  pDom.textContent = data.message
  document.getElementById('message').appendChild(pDom)
}

ws.onclose = () => {
  console.log('关闭服务器')
}

ws.onerror = () => {
  console.log('连接出错')
}

sendMessage = (info) => {
  ws.send(JSON.stringify(info))
}

document.getElementById('send').onclick= function () {
  console.log('send')
  debugger
  params.message = document.getElementById('sendVal').value
  sendMessage(params)
}