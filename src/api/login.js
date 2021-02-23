import instance from '../router/request'



export function userLogin(data) {
    return instance({
        url:'/login',
        method:'post',
        data
    })
}
export function codeUrl() {
    return process.env.VUE_APP_BASEURL + `/captcha?type=login&${Date.now()}`
}