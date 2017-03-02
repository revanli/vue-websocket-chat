import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from './router'
import App from './App'

Vue.use(VueRouter)
// 创建一个路由器实例
const router = new VueRouter()

Router(router, App)