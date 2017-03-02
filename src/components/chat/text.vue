<template>
  <div class="text">
    <textarea placeholder="Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
  </div>
</template>

<script>
import { actions } from '../../vuex/store'
import Ws from '../../api/client'

export default {
  vuex: {
    actions: actions,
    getters: {
      receiver: ({ currentSessionId }) => currentSessionId,
      sender: ({ loginUser }) => loginUser.id
    }
  },
  data () {
    return {
      content: ''
    }
  },
  methods: {
    onKeyup (e) {
      if (e.keyCode === 13 && this.content.length) {
        Ws.sendMessage({'content': this.content, 'receiver': this.receiver, 'sender': this.sender})
        // 清空消息输入框
        this.content = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  height: 160px;
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}
</style>