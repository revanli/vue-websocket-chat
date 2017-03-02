/**
 * real-time server node server js
 * date: 2016-12-01
 * http://socket.io/
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.send('<h1>Welcome Realtime Server</h1>')
});

const now = new Date()
var userId = 1
// 会话列表，包括users
var sessions = [
  {
    id: 1,
    user: {
      name: '示例介绍',
      img: '/static/images/2.png',
      wechat: ''
    },
    messages: [
      {
        content: 'Hello，这是一个基于Vue + Vuex + Webpack + socket.io构建的简单chat示例',
        self: false,
        date: now,
        example: true
      },
      {
        content: '项目地址: https://github.com/revanli/vue-websocket-chat',
        self: false,
        date: now,
        example: true
      }
    ]
  }
];

io.on('connection', function (socket) {
  console.log('a user connected');
  // 初始化
  init()

  // 监听用户登陆
  socket.on('login', function (obj) {
    // 寻找是否存在用户，没有则添加
    var index = sessions.findIndex(userObj => userObj.hasOwnProperty(obj.id))
    if (index === -1) {
      userId++
      obj.id = userId
      sessions.push(obj)
      //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
      socket.name = obj.id;
      io.emit('saveUsers', sessions)
    }
  })

  // 监听消息
  socket.on('message', function (msg) {
    let sender_session = sessions.find(userObj => userObj.id === msg.sender)
    let receiver_session = sessions.find(userObj => userObj.id === msg.receiver)
    var msg = {
      content: msg.content,
      date: new Date(),
      receiver: msg.receiver,
      sender: msg.sender
    }
    sender_session.messages.push(msg)
    receiver_session.messages.push(msg)
    io.emit('message', msg)
  })

  // 监听登出消息
  socket.on('disconnect', function () {
    // 寻找是否存在用户，有则删除
    var index = sessions.findIndex(userObj => userObj.hasOwnProperty(socket.name))
    if (index === -1) {
      userId--
      userId = userId < 1 ? 1 : userId
      // 删除对象
      sessions.splice(index, 1)
      io.emit('saveUsers', sessions)
    }
  })
});

function init () {
  // 初始化在线人员
  io.emit('saveUsers', sessions)
}

http.listen(3000, function() {
  console.log('listening to *:3000')
})
