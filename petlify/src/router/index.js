import { createRouter, createWebHistory } from 'vue-router'

// const updateTitle = (to) => {
//     const baseTitle = 'Petlify'

//     // Set document title based on current route
//     document.title = to.meta.title ? `${to.meta.title} - ${baseTitle}` : baseTitle
// }

// router.beforeEach((to, from, next) => {
//     updateTitle(to) // Update title before each route navigation
//     next()
// })

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/pages/Home.vue')
    },
    {
        path: '/signup',
        name: 'Sign Up',
       component: () => import('@/pages/SignUp.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/Login.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/About.vue')
    }
]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

export default router