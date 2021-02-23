// 导入请求对象
import instance from '@/utils/request'
// 导入工具函数
// import { getToken } from '../utils/token'

// 新增企业
export function addEnterprise (data) {
  return instance({
    url: '/enterprise/add',
    method: 'post',
    data
  })
}
// 删除企业
export function removeEnterprise (data) {
  return instance({
    url: '/enterprise/remove',
    method: 'post',
    data
  })
}
// 修改企业
export function editEnterprise (data) {
  return instance({
    url: '/enterprise/edit',
    method: 'post',
    data
  })
}
// 查询企业
export function getEnterprise (params) {
  return instance({
    url: '/enterprise/list',
    method: 'get',
    // get请求的参数用params进行传递
    params
  })
}

// 企业状态修改
export function changeEnterpriseStatus (data) {
  return instance({
    url: '/enterprise/status',
    method: 'post',
    data
  })
}
