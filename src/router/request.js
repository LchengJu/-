import axios from 'axios'
// Set config defaults when creating the instance
const instance = axios.create({
    // 创建基地址
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true,
});

export default instance