import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import SignUp from '@/pages/SignUp.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: SignUp
    }
]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

export default router