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
        path: '/about',
        name: 'About',
        component: () => import('@/pages/About.vue')
    },

    // Auth
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
        path: '/forgotPassword',
        name: 'Forgot Password',
        component: () => import('@/pages/ForgotPassword.vue')
    },
    {
        path: '/resetPassword',
        name: 'Reset Password',
        component: () => import('@/pages/ResetPassword.vue')
    },
    {
        path: '/changePassword',
        name: 'Change Password',
        component: () => import('@/pages/ChangePassword.vue')
    },

    // Users
    {
        path: '/profile',
        name: 'User Profile',
        component: () => import('@/pages/UserProfile.vue')
    },

    // Pets
    {
        path: '/createPet',
        name: 'Create Pet Profile',
        component: () => import('@/pages/Pets/CreatePet.vue')
    },
]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

export default router