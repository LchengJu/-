// 导入请求对象
import instance from '@/utils/request'
// 导入工具函数
// import { getToken } from '../utils/token'

// 新增用户
export function addUser (data) {
  return instance({
    url: '/user/add',
    method: 'post',
    data
  })
}
// 删除用户
export function removeUser (data) {
  return instance({
    url: '/user/remove',
    method: 'post',
    data
  })
}
// 修改用户
export function editUser (data) {
  return instance({
    url: '/user/edit',
    method: 'post',
    data
  })
}
// 查询用户
export function getUser (params) {
  return instance({
    url: '/user/list',
    method: 'get',
    // get请求的参数用params进行传递
    params
  })
}

// 用户状态修改
export function changeUserStatus (data) {
  return instance({
    url: '/user/status',
    method: 'post',
    data
  })
}
