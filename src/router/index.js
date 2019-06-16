import Vue from 'vue'
import Router from 'vue-router'
import bregister from '@/page/buyer/register'
import blogin from '@/page/buyer/login'
import bhome from '@/page/buyer/home'
import index from '@/page/buyer/index'
import goodsDetails from '@/page/buyer/goodsDetails'
import cart from '@/page/buyer/cart'
import checkout from '@/page/buyer/checkout'
import order from '@/page/buyer/order'
import buyer from '@/page/buyer/buyer'
import orderDetails from '@/page/buyer/orderDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/buyer/home',
      children: [
        {path: '/buyer/home', component: bhome},
        {path: '/buyer/goodsDetails', component: goodsDetails}
      ]
    },
    {path: '/buyer/login', name: 'blogin', component: blogin},
    {path: '/buyer/cart', name: 'cart', component: cart},
    {path: '/buyer/register', name: 'bregister', component: bregister},
    {path: '/buyer/checkout', name: 'checkout', component: checkout},
    {
      path: '/buyer',
      name: 'buyer',
      component: buyer,
      redirect: '/buyer/orderList',
      children: [
        {path: '/buyer/orderList', name: 'orderList', component: order},
        {path: '/buyer/orderDetails', name: 'orderDetails', component: orderDetails}
      ]
    },
    {path: '/*', redirect: '/buyer/home'}
  ]
})
