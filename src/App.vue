<template>
  <div id="my-app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex/store'

export default {
  store,
  components: {
  }
}
</script>

<style>
#my-app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f5f5 url('/static/images/bg.jpg') no-repeat center;
  background-size: cover;
  color: #2c3e50;
  padding-top: 60px;
  height: 100%
}
</style>
