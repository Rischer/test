// 1- 对于数据请求的封装
// import axios from 'axios'
// function httpForList () {
//   return axios({
//     url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=9316576',
//     headers: {
//       'X-Client-Info':
//         '{"a":"3000","ch":"1002","v":"5.2.1","e":"16828624254013097182298113","bc":"310100"}',
//       'X-Host': 'mall.film-ticket.film.list'
//     }
//   })
// }
// function httpForDetail (params) {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${params}&k=5589453`,
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16828624254013097182298113","bc":"310100"}',
//       'X-Host': 'mall.film-ticket.film.info'
//     }
//   })
// }
// export default {
//   httpForList,
//   httpForDetail
// }
// 2- 对于数据请求的封装
import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16828624254013097182298113","bc":"310100"}',
    'X-Host': 'mall.film-ticket.film.list'
  }
})

// 在发请求之前拦截 -- showLoading
http.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  return Promise.reject(error)
})

// 在成功之后拦截 -- hideLoading
http.interceptors.response.use(function (response) {
  // 隐藏
  Toast.clear()
  return response
}, function (error) {
  // 隐藏
  Toast.clear()
  return Promise.reject(error)
})
export default http
