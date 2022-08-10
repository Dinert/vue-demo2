import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/table',
        },
        {
            path: '/table',
            name: 'Table',
            component: () => import('@/views/MyTable')
        }
    ]
})

export default router
