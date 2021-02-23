// 导入请求对象
import instance from '@/utils/request'
// 导入工具函数
// import { getToken } from '../utils/token'

// 新增题库
export function addQuestion (data) {
  return instance({
    url: '/question/add',
    method: 'post',
    data
  })
}
// 删除题库
export function removeQuestion (data) {
  return instance({ 
    url: '/question/remove',
    method: 'post', 
    data
  })
}
// 修改题库
export function editQuestion (data) {
  return instance({
    url: '/question/edit',
    method: 'post',
    data
  })
}
// 查询题库
export function getQuestion (params) {
  return instance({
    url: '/question/list',
    method: 'get',
    // get请求的参数用params进行传递
    params
  })
}

// 题库状态修改
export function changeQuestionStatus (data) {
  return instance({
    url: '/question/status',
    method: 'post',
    data
  })
}


// 获取题库信息
export function questionOne(data) {
  return instance({
    url:'/question/one',
    method:'post',
    data
  })
}

// 上传文件
export function questionUpload() {
  return process.env.VUE_APP_BASEURL + '/question/upload'
}