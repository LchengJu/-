// 声明token键值常量 （常量用大写）
const TONKENKEY = 'MMtoken'

// 保存token
export function setToken(value) {
    window.localStorage.setItem(TONKENKEY, value)
}

// 获取token
export function getToken() {
    return window.localStorage.getItem(TONKENKEY)
}
// 删除token
export function removeToken() {
    window.localStorage.removeItem(TONKENKEY)
}