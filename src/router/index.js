// 导入Vue
import Vue from 'vue'
// 导入router 模块
import VueRouter from 'vue-router'
// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
import routes from './routes'

// // 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'



Vue.use(VueRouter)

// 先声明后使用！！！！！
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})


// 使用进度条
router.beforeEach((to, from, next) => {
    // 开启导航
    NProgress.start()
    // 进入下一个管道
    next()
})

router.afterEach((to) => {
    // to and from are both route objects.
    // 关闭导航
    document.title = to.meta.title
    NProgress.done()
})


export default router