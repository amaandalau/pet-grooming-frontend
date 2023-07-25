import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: 'Home'
        },
        component: () => import('@/pages/Home.vue')
    },
    {
        path: '/about',
        name: 'About',
        meta: {
            title: 'About'
        },
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
        meta: {
            title: 'Sign Up'
        },
       component: () => import('@/pages/SignUpForm.vue')
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Login'
        },
        component: () => import('@/pages/LoginForm.vue')
    },
    {
        path: '/forgotPassword',
        name: 'Forgot Password',
        meta: {
            title: 'Forgot Password'
        },
        component: () => import('@/pages/ForgotPassword.vue')
    },
    {
        path: '/resetPassword',
        name: 'Reset Password',
        meta: {
            title: 'Reset Password'
        },
        component: () => import('@/pages/ResetPassword.vue')
    },
    {
        path: '/changePassword',
        name: 'Change Password',
        meta: {
            title: 'Change Password'
        },
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
        meta: {
            title: 'Profile'
        },
        component: () => import('@/pages/ProfilePage.vue')
    },
    {
        path: '/editProfile/:id',
        name: 'Edit Profile',
        meta: {
            title: 'Edit Profile'
        },
        component: () => import('@/pages/EditProfilePage.vue')
    },

    // Pets
    {
        path: '/:id/pets',
        name: 'Pets',
        meta: {
            title: 'Pets'
        },
        component: () => import('@/pages/Pets/Pets.vue')
    },
    {
        path: '/createPet',
        name: 'Create Pet Profile',
        meta: {
            title: 'Create Pet'
        },
        component: () => import('@/pages/Pets/CreatePet.vue')
    },
    {
        path: '/editPet/:id',
        name: 'Edit Pet Profile',
        meta: {
            title: 'Edit Pet'
        },
        component: () => import('@/pages/Pets/EditPet.vue')
    },
    {
        path: '/petProfile/:id',
        name: 'Pet Profile',
        meta: {
            title: 'Pet Profile'
        },
        component: () => import('@/pages/Pets/PetProfile.vue')
    },
    {
        path: '/:petID/createPetAppt',
        name: 'Create Pet Appointment',
        meta: {
            title: 'Create Appointment'
        },
        component: () => import('@/pages/Pets/CreatePetAppt.vue')
    },
    {
        path: '/:petID/petApptDetails/:apptID',
        name: 'Pet Appointment Details',
        meta: {
            title: 'Appointment Details'
        },
        component: () => import ('@/pages/Pets/PetApptDetails.vue')
    },
    {
        // path: '/:petID/editPetAppt',
        path: '/:petID/editPetAppt/:apptID',
        name: 'Edit Pet Appointment',
        meta: {
            title: 'Edit Appointment'
        },
        component: () => import ('@/pages/Pets/EditPetAppt.vue')
    },

    // Appointments (Groomer's Dashboard)
    {
        path: '/:groomerID/appointments',
        name: 'Appointments',
        meta: {
            title: 'Upcoming Appointments'
        },
        component: () => import ('@/pages/Appointments/Appointments.vue')
    },
    {
        path: '/apptDetails/:apptID',
        name: 'Appointment Details',
        meta: {
            title: 'Appointment Details'
        },
        component: () => import('@/pages/Appointments/ApptDetails.vue')
    },
    {
        path: '/editAppt/:apptID',
        name: 'Edit Appointment',
        meta: {
            title: 'Edit Appointment'
        },
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

router.beforeEach((to, from) => {
    document.title = to.meta?.title ?? 'Petlify'
})

export default router