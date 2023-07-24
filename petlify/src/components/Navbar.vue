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

const userData = reactive({
    id: null,
    role: null
})

const getUserData = async () => {
    const user = await authStore.getCurrentUser()

    userData.id = user.id
    userData.role = user.role
}

onMounted(() => {
    getUserData()
})

</script>

<template>
    <div class="bg-transparent flex flex-row items-center justify-between p-4 z-100 drop-shadow-sm">
        <!-- <div @click="goToHome" class="flex flex-row justify-start gap-1 hover:cursor-pointer">
            <Logo/>
            <label class="font-semibold text-xl hover:cursor-pointer">Petlify</label>
        </div> -->

        <!-- <div class="flex flex-row items-center justify-end gap-4">
            <NavbarMenu nav-title="Home" @click="goToHome"/>

            <NavbarMenu nav-title="About" @click="goToAbout"/>
        </div> -->

        <!-- If logged in user is owner -->
        <template v-if="userData.role === 'owner'">
            <div @click="goToPetsList" class="flex flex-row justify-start gap-1 hover:cursor-pointer">
                <Logo/>
                <label class="font-semibold text-xl hover:cursor-pointer">Petlify</label>
            </div>

            <div class="flex flex-row items-center justify-end gap-4">

                <NavbarMenu nav-title="My Pets" @click="goToPetsList"/>
                
                <!-- <NavbarMenu nav-title="Appointments"/> -->
                
                <DropdownMenu :user="getUserData()"/>
            
            </div>
        </template>

        <!-- If logged in user is groomer -->
        <template v-else-if="userData.role === 'groomer'">
            <div @click="goToPetsList" class="flex flex-row justify-start gap-1 hover:cursor-pointer">
                <Logo/>
                <label class="font-semibold text-xl hover:cursor-pointer">Petlify</label>
            </div>

            <div class="flex flex-row items-center justify-end gap-4">

                <NavbarMenu nav-title="Upcoming Appointments"/>
                
                <NavbarMenu nav-title="My Services"/>
                
                <DropdownMenu :user="getUserData()"/>
            
            </div>
        </template>

        <template v-else>
            <div @click="goToPetsList" class="flex flex-row justify-start gap-1 hover:cursor-pointer">
                <Logo/>
                <label class="font-semibold text-xl hover:cursor-pointer">Petlify</label>
            </div>
            
            <div class="flex flex-row items-center justify-end gap-4">
                <NavbarMenu nav-title="Home" @click="goToHome"/>

                <NavbarMenu nav-title="About" @click="goToAbout"/>
            </div>

            <div class="w-1/8">
                <ButtonNew @click="goToSignUp" text="Sign Up" rounded="sm" size="large" class="default"/>
            </div>
        </template>
    </div>
</template>