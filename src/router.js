import Login from './components/login'
import Wechat from './components/chat/wechat'

export default function (router, App) {
  router.map({
    '/': {
      name: 'login',
      component: Login
    },
    '/wechat': {
      name: 'wechat',
      component: Wechat
    }
  })
  router.start(App, 'app')
}