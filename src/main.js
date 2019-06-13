// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import { Button, Pagination, Checkbox, Icon, Autocomplete, Loading, Message, Notification, Steps, Step, Table, TableColumn, Input, Dialog, Select, Option } from 'element-ui'
import VueLazyload from 'vue-lazyload'
import {checkLogin} from '/api/index.js'
import { getStore } from '/utils/storage'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: '/static/images/load.gif'
  // attempt: 1
})
// Vue.use(Button)
// Vue.use(Pagination)
// Vue.use(Checkbox)
// Vue.use(Icon)
// Vue.use(Autocomplete)
// Vue.use(Steps)
// Vue.use(Step)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Input)
// Vue.use(Dialog)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(Loading.directive)
// Vue.prototype.$loading = Loading.service
// Vue.prototype.$notify = Notification
// Vue.prototype.$message = Message

Vue.config.productionTip = false

const whiteList = ['/buyer/register', '/buyer/login', '/seller/login', '/seller/register']
router.beforeEach(function (to, from, next) {
  let role = getStore('role')
  role = role === null ? 1 : role
  let id = getStore('id')
  id = id === null ? 0 : id
  let params = {
    role,
    id
  }
  checkLogin(params).then(res => {
    console.log(res)
    if (res.code !== 200) { // 未登陆
      if (whiteList.indexOf(to.path) !== -1) { // 在白名单中
        next()
      } else {
        next('/buyer/login')
      }
    } else {
      if (to.path === '/buyer/login') {
        next('/buyer/home')
      }
      if (to.path === '/seller/login') {
        next('/selle/home')
      }
      next()
    }
  })
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // components: { App },
  template: '<App/>',
  render: h => h(App)
})
