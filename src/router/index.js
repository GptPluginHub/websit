import { createRouter, createWebHistory } from "vue-router";
const routerHistory = createWebHistory()
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