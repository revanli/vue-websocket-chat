/**
 * 前端socket.io api
 * date: 2016-12-01
 */
import io from 'socket.io-client'
import store from '../vuex/store'

const Ws = {
  userId: null,
  socket: null,
  // 建立连接以及监听
  init () {
    this.socket = io.connect('ws://127.0.0.1:3000')

    //心跳包，30s左右无数据浏览器会断开连接Heartbeat
    setInterval(() => {
      this.socket.emit('heartbeat', 1)
    }, 10000)

    // 监听新用户登录
    this.socket.on('saveUsers', (sessions) => {
      this.userId = sessions.length + 1
      store.dispatch('USER_DATA', sessions)
    })

    // 监听消息发送
    this.socket.on('message', (msg) => {
      store.dispatch('SEND_MESSAGE', msg)
    })
  },
  // 方法
  sendMessage (data) {
    this.socket.emit('message', data)
  },
  login (data) {
    this.socket.emit('login', data)
    store.dispatch('SET_CURRENT_USER', {id: this.userId, data: data})
  }
}

export default Ws
