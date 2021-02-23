// 导入axios
import axios from 'axios'
import { getToken } from './token'
import { Message } from 'element-ui';
import {removeToken} from './token'
import route from 'router'
// 创建instance
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  // 跨域携带cookie
  withCredentials: true
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 添加token
    config.headers.token = getToken()
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)


// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
  // 对响应数据做点什么
    console.log(response);
  if (response.data.code == 206) {
    Message.error('请重新登录')
    removeToken()
    route.push('./login')
  } else if(response.data.code == 200) {
    return response
  } else {
    Message.error(response.data.message)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})


// 暴露出去
export default instance
