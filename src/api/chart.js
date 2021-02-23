import instance from '../router/request'
import {getToken} from '../utils/token'

// 面板数据接口
export function getPanelData() {
    return instance({
        url: `/data/title`,
        method: 'post',
        headers: {token: getToken()},
    })
}
// 热门城市题目统计
export function getHotCity() {
    return instance({
        url: `/data/hot_cities`,
        method: 'post',
        headers: {token: getToken()},
    })
}
// 企业题目数据统计
export function getStatistics() {
    return instance({
        url: `/data/statistics`,
        method: 'post',
        headers: {token: getToken()},
    })
}