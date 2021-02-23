// 导入请求对象
import instance from '@/utils/request'
// 导入工具函数
// import { getToken } from '../utils/token'

// 新增学科
export function addSubject (data) {
  return instance({
    url: '/subject/add',
    method: 'post',
    data
  })
}
// 删除学科
export function removeSubject (data) {
  return instance({
    url: '/subject/remove',
    method: 'post',
    data
  })
}
// 修改学科
export function editSubject (data) {
  return instance({
    url: '/subject/edit',
    method: 'post',
    data
  })
}
// 查询学科
export function getSubject (params) {
  return instance({
    url: '/subject/list',
    method: 'get',
    // get请求的参数用params进行传递
    params
  })
}

// 学科状态修改
export function changeSubjectStatus (data) {
  return instance({
    url: '/subject/status',
    method: 'post',
    data
  })
}
