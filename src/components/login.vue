<template>
  <div class="login-wrapper" transition="loginslide">
    <div class="login-header"></div>
    <div class="login-body">
      <div class="login-title">
        简单聊天
      </div>
      <div class="user-name">
        <label>群昵称：</label>
        <input type="text" v-model="name" placeholder="10个字以内">
      </div>
      <div class="wechat">
        <label>微信号：</label>
        <input type="text" v-model="wechat" placeholder="方便私聊（选填）">
      </div>
      <div class="login-btn-wrap">
        <span class="login-btn" @click="login">登录</span>
      </div>
      <div class="foot">
        <span>@<a href="http://www.revan.me" target="_blank">个人博客</a></span>
      </div>
    </div>
  </div>
</template>

<script>
import { actions } from '../vuex/store'
import Ws from '../api/client'

export default {
  vuex: {
    actions: actions,
    getters: {
      sessions: (state) => {
        return state.sessions
      }
    }
  },
  data () {
    return {
      userInfo: {
        id: 0,
        user: {
          name: '',
          wechat: ''
        },
        messages: []
      },
      name: '',
      wechat: ''
    }
  },
  ready () {
    Ws.init()
  },
  methods: {
    login () {
      if (!this.name.trim()) {
        alert('昵称不为空！')
        return false
      }
      // 去除多余的字符
      this.userInfo.user.name = this.name.slice(0, 10)
      this.userInfo.user.img = this.getRandomImg()
      if (this.wechat.trim()) {
        this.userInfo.user.wechat = this.wechat.trim()
      }
      // 通过vuex保存用户信息到store
      Ws.login(this.userInfo)
      this.$router.go('/wechat')
    },
    getRandomImg () {
      var avatarPath = '/static/images/avatars/'
      var avatarStr = avatarPath + this.getRandomInt(1, 10) + '.jpeg'
      return avatarStr
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
}
</script>

<style lang='less' scoped>
.login-wrapper {
  background-color: #fff;
  position: absolute;
  top: 0;
  left: -100%;
  right: 100%;
  bottom: 0;
  .login-header{
    width: 50%;
    margin: 100px auto 0 auto;
    height: 30%;
    max-height: 300px;
    background: url(/static/images/login-header.jpg);
  }
  .login-body {
    width: 50%;
    margin: 0 auto;
    .login-title {
      height: 80px;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bolder;
      color: #999;
    }
    .user-name, .wechat {
      display: flex;
      height: 40px;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #999;
      border-top: solid 1px rgba(0,0,0,0.05);
      lable {
        color: #999;
      }
      input {
        box-sizing: border-box;
        height: 25px;
        border: none;
        outline: none;
        padding: 5px;
        color: #666;
        background-color: rgba(0,0,0,0.02);
      }
    }
    .login-btn-wrap {
      display: flex;
      height: 80px;
      align-items: center;
      font-size: 16px;
      color: #999;
      .login-btn {
        background-color: #3CAF36;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50%;
        height: 40px;
        margin: 10px auto;
        color: #fff;
        font-weight: bolder;
      }
    }
  }
  .foot {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 13px;
    color: #999;
    span {
      display: inline-block;
    }
    span:first-child {
      font-size: 15px;
    }
  }
  a {
    color: #999;
  }
}
/* 必需 */
.loginslide-transition {
  transition: all .3s ease;
  transform: translate(100%, 0);
}

/* .loginslide-enter 定义进入的开始状态 */
/* .loginslide-leave 定义离开的结束状态 */
.loginslide-leave, .loginslide-enter {
  transform: translate(0%, 0);
}
</style>