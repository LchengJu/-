
// 导入登录模块
import login from '@/views/login'
// 导入主页模块
import index from '@/views/index'

// 导入主页的儿子们
import user from '../views/index/user/user.vue'
import chart from '../views/index/chart/chart.vue'
import subject from '../views/index/subject/subject.vue'
import company from '../views/index/company/company.vue'
import question from '../views/index/question/question.vue'
import demo from '../views/index/demo/demo.vue'

// 2. 定义路由
const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login', component: login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/index', component: index,
        redirect: '/index/chart',
        meta: {
            title: '首页',
            roles: ['学生', '老师', '管理员'],
        },
        children: [
            {
                path: 'chart', component: chart,
                meta: {
                    title: '数据概览',
                    roles: ['学生', '老师', '管理员'],
                    icon: 'el-icon-pie-chart'
                }
            },
            {
                path: 'user', component: user,
                meta: {
                    title: '用户列表',
                    roles: ['老师', '管理员'],
                    icon: 'el-icon-user'
                }
            },
            {
                path: 'subject', component: subject,
                meta: {
                    title: '学科列表',
                    roles: ['老师', '管理员'],
                    icon: 'el-icon-notebook-2'
                }
            },
            {
                path: 'company', component: company,
                meta: {
                    title: '企业列表',
                    roles: ['老师', '管理员'],
                    icon: 'el-icon-office-building'
                }
            },
            {
                path: 'question', component: question,
                meta: {
                    title: '题库列表',
                    roles: ['老师', '管理员'],
                    icon: 'el-icon-edit-outline'
                }
            },
            {
                path: 'demo', component: demo,
                meta: {
                    title: '题库列表',
                    roles: ['老师', '管理员'],
                    icon: 'el-icon-edit-outline'
                }
            }
        ]
    },
]

export default routes