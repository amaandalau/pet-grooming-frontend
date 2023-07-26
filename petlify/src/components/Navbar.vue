<script setup>
import Logo from './icons/Logo.vue'
import NavbarMenu from './NavbarMenu.vue'
import DropdownMenu from './DropdownMenu.vue'
import ButtonNew from './ButtonNew.vue'

import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { useAuthStores } from '../stores/auth'
import { useUserStores } from '../stores/users'

const router = useRouter()
const authStore = useAuthStores()
const userStore = useUserStores()

const goToHome = () => {
    router.push('/')
}

const goToAbout = () => {
    router.push('/about')
}

const goToSignUp = () => {
    router.push('/signup')
}

const goToPetsList = () => {
    router.push(`/${userData.id}/pets`)
}

const goToAppts = () => {
    router.push(`/${userData.id}/appointments`)
}

const userData = reactive({
    id: null,
    role: null
})

const getUserData = async () => {
    const user = await authStore.getCurrentUser()

    userData.id = user.id
    userData.role = user.role
}

const setLogoRoute = () => {
    if(userData.role === 'owner') {
        goToPetsList()
    } else if (userData.role === 'groomer') {
        goToAppts()
    } else {
        goToHome()
    }
}

onMounted(() => {
    getUserData()
})

</script>

<template>
    <div class="bg-transparent flex flex-row items-center justify-between p-4 z-100 drop-shadow-sm">
        <div @click="setLogoRoute" class="flex flex-row justify-start gap-1 hover:cursor-pointer">
            <Logo/>
            <label class="font-semibold text-xl hover:cursor-pointer">Petlify</label>
        </div>

        <div class="flex flex-row items-center justify-end gap-4">
             <!-- If logged in user is owner -->
            <template v-if="userData.role === 'owner'">
                <NavbarMenu nav-title="My Pets" @click="goToPetsList"/>
                                
                <DropdownMenu :user="getUserData()"/>
            
            </template>

                <!-- If logged in user is groomer -->
            <template v-else-if="userData.role === 'groomer'">

                <NavbarMenu nav-title="Upcoming Appointments" @click="goToAppts"/>
                            
                <DropdownMenu :user="getUserData()"/>
                
            </template>

            <template v-else>

                <NavbarMenu nav-title="Home" @click="goToHome"/>

                <NavbarMenu nav-title="About" @click="goToAbout"/>

            <div class="w-1/8">
                <ButtonNew @click="goToSignUp" text="Sign Up" rounded="sm" size="large" class="default"/>
            </div>
        </template>

        </div>
    </div>
</template>