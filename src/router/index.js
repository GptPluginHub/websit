import { createRouter, createWebHashHistory } from "vue-router";
const routerHistory = createWebHashHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home/index.vue')
        }
    ]
})
export default router