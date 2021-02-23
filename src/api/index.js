import instance from '../router/request'


// 获取用户信息
export function getUserInfo(data) {
    return instance({
        url: `/info`,
        method: 'get',
        headers: {token: data},
    })
}

// 用户头像
export function userUrl(data){
    return process.env.VUE_APP_BASEURL+`${data}`
}

