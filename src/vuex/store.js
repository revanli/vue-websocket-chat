/**
 * Vuex
 * date: 2016-11-04
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from './logger'
Vue.use(Vuex)

const now = new Date()
const avatar = '/static/images/avatars/1.jpeg'

const store = new Vuex.Store({
  state: {
    // 显示头像
    loginUser: {
      name: 'revan',
      img: avatar,
      id: 0
    },
    // 会话列表
    sessions: [],
    // 当前选中的会话
    currentSessionId: 1,
    // 过滤只包含这个key的会话
    filterKey: ''
  },
  mutations: {
    USER_DATA (state, sessions) {
      state.sessions = sessions
    },
    // 发送消息
    SEND_MESSAGE ({ sessions, currentSessionId, loginUser }, msg) {
      let sender_session = sessions.find(userObj => userObj.id === msg.sender)
      var receiver_session = sessions.find(userObj => userObj.id === msg.receiver)
      var msg = {
        content: msg.content,
        date: new Date(),
        receiver: msg.receiver,
        sender: msg.sender,
        self: msg.sender === loginUser.id
      }
      sender_session.messages.push(msg)
      receiver_session.messages.push(msg)
    },
    // 选择会话
    SELECT_SESSION (state, id) {
      state.currentSessionId = id
    },
    // 搜索
    SET_FILTER_KEY (state, value) {
      state.filterKey = value
    },
    // 当前登录账户
    SET_CURRENT_USER (state, obj) {
      state.loginUser.id = obj.id
      state.loginUser.img = obj.data.user.img
      state.loginUser.name = obj.data.user.name
    }
  }
})

export default store
export const actions = {
  saveUserInfo: ({ dispatch }, data) => dispatch('USER_DATA', data),
  sendMessage: ({ dispatch }, msg) => dispatch('SEND_MESSAGE', msg),
  selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
  search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value),
}