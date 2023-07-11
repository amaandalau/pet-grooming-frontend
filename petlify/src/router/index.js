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
    // {
    //     path: '/signup',
    //     name: 'Sign Up',
    //    component: () => import('@/pages/SignUp.vue')
    // },
    {
        path: '/signup',
        name: 'Sign Up',
       component: () => import('@/pages/SignUpForm.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/pages/LoginForm.vue')
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
    // {
    //     path: '/profile',
    //     name: 'User Profile',
    //     component: () => import('@/pages/UserProfile.vue')
    // },
    {
        path: '/profile',
        name: 'User Profile 2',
        component: () => import('@/pages/ProfilePage.vue')
    },
    {
        path: '/editProfile',
        name: 'Edit Profile',
        component: () => import('@/pages/EditProfilePage.vue')
    },

    // Pets
    {
        path: '/pets',
        name: 'Pets',
        component: () => import('@/pages/Pets/Pets.vue')
    },
    {
        path: '/createPet',
        name: 'Create Pet Profile',
        component: () => import('@/pages/Pets/CreatePet.vue')
    },
    {
        path: '/editPet',
        name: 'Edit Pet Profile',
        component: () => import('@/pages/Pets/EditPet.vue')
    },
    {
        path: '/petProfile',
        name: 'Pet Profile',
        component: () => import('@/pages/Pets/PetProfile.vue')
    },

    // Appointments (Groomer's Dashboard)
    {
        path: '/appointments',
        name: 'Appointments',
        component: () => import ('@/pages/Appointments.vue')
    }
]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

export default router