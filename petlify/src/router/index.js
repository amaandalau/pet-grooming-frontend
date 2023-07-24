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
        path: '/profile/:id',
        name: 'User Profile',
        component: () => import('@/pages/ProfilePage.vue')
    },
    {
        path: '/editProfile/:id',
        name: 'Edit Profile',
        component: () => import('@/pages/EditProfilePage.vue')
    },

    // Pets
    {
        path: '/:id/pets',
        name: 'Pets',
        component: () => import('@/pages/Pets/Pets.vue')
    },
    {
        path: '/createPet',
        name: 'Create Pet Profile',
        component: () => import('@/pages/Pets/CreatePet.vue')
    },
    {
        path: '/editPet/:id',
        name: 'Edit Pet Profile',
        component: () => import('@/pages/Pets/EditPet.vue')
    },
    {
        path: '/petProfile/:id',
        name: 'Pet Profile',
        component: () => import('@/pages/Pets/PetProfile.vue')
    },
    {
        path: '/:petID/createPetAppt',
        name: 'Create Pet Appointment',
        component: () => import('@/pages/Pets/CreatePetAppt.vue')
    },
    {
        path: '/:petID/petApptDetails/:apptID',
        name: 'Pet Appointment Details',
        component: () => import ('@/pages/Pets/PetApptDetails.vue')
    },
    {
        // path: '/:petID/editPetAppt',
        path: '/:petID/editPetAppt/:apptID',
        name: 'Edit Pet Appointment',
        component: () => import ('@/pages/Pets/EditPetAppt.vue')
    },

    // Appointments (Groomer's Dashboard)
    {
        path: '/:groomerID/appointments',
        name: 'Appointments',
        component: () => import ('@/pages/Appointments/Appointments.vue')
    },
    {
        path: '/apptDetails/:apptID',
        name: 'Appointment Details',
        component: () => import('@/pages/Appointments/ApptDetails.vue')
    },
    {
        path: '/editAppt/:apptID',
        name: 'Edit Appointment',
        component: () => import('@/pages/Appointments/EditAppt.vue')
    },

    // Settings
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('')
    }
]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

export default router