import http from './public.js'

// 注册账号
export const register = (params) => {
  return http.fetchPost('/v1.0/register', params)
}

// 获取验证码
export const smscode = (params) => {
  return http.fetchGet('/v1.0/smscode', params)
}

// buyer使用密码登陆
export const blogin1 = (params) => {
  return http.fetchPost('/v1.0/buyer/passwordLogin', params)
}

// buyer使用验证码登陆
export const blogin2 = (params) => {
  return http.fetchPost('/v1.0/buyer/smscodeLogin', params)
}

export const checkLogin = (params) => {
  return http.fetchGet('/v1.0/checkLogin', params)
}

// 加入购物车
export const addToCart = (params) => {
  return http.fetchPost('/v1.0/buyer/cart', params)
}

// 获取购物车列表
export const shopcartList = (params) => {
  return http.fetchGet('/v1.0/buyer/cart', params)
}

// 删除购物车里的商品
export const deleteCart = (params) => {
  return http.fetchDelete('/v1.0/buyer/cart', params)
}

// 获取首页商品列表
export const homeList = (params) => {
  return http.fetchGet('/v1.0/buyer/commodities', params)
}

// 获取商品详情
export const commodityDetails = (params) => {
  return http.fetchGet('/v1.0/buyer/commodity', params)
}
