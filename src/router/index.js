import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import bregister from '@/page/buyer/register'
import blogin from '@/page/buyer/login'
import bhome from '@/page/buyer/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {path: '/buyer/login', name: 'blogin', component: blogin},
    {path: '/buyer/home', name: 'bhome', component: bhome},
    {path: '/buyer/register', name: 'bregister', component: bregister}
  ]
})
