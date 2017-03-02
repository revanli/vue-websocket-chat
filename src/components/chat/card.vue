<template>
  <div class="card">
    <header>
      <img class="avatar" width="40" height="40" :alt="loginUser.name" :src="loginUser.img" />
      <p class="name">{{loginUser.name}}</p>
    </header>
    <footer>
      <input type="text" class="search" placeholder="search user..." @keyup="onKeyup | debounce 150">
    </footer>
  </div>
</template>

<script>
import { actions } from '../../vuex/store'
export default {
  vuex: {
    actions: actions,
    // 接受state作为唯一参数, 这里是参数解构
    getters: {
      loginUser: ({ loginUser }) => loginUser,
      filterKey: ({ filterKey }) => filterKey
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onKeyup (e) {
      console.log(e.target.value)
      this.search(e.target.value)
    }
  }
}
</script>

<style scoped lang="less">
.card {
  padding: 12px;
  border-bottom: solid 1px #24272C;

  footer {
    margin-top: 10px;
  }

  .avatar, .name {
    vertical-align: middle;
  }
  .avatar {
    border-radius: 2px;
  }
  .name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 16px;
  }
  .search {
    padding: 0 10px;
    width: 100%;
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    border: solid 1px #3a3a3a;
    border-radius: 4px;
    outline: none;
    background-color: #26292E;
  }
}
</style>