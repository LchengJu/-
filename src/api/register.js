import instance from '../router/request'

// 短信发送接口
export function registerPhoneCode(data) {
    return instance({
        url: '/sendsms',
        method: 'post',
        data
    })
}

// 用户注册接口
export function userRegister(data) {
    return instance({
        url: '/register',
        method: 'post',
        data
    })
}

// 获取短信验证码
export function registerUrl() {
    return process.env.VUE_APP_BASEURL + `/captcha?type=sendsms&${Date.now()}`
}
// 上传头像
export function imgUploads() {
    return process.env.VUE_APP_BASEURL + `/uploads`
}