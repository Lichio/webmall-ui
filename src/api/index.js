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
