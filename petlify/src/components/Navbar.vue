<script setup>
import { useRouter } from 'vue-router'
import Logo from './icons/Logo.vue'
import NavbarMenu from './NavbarMenu.vue'
import DropdownMenu from './DropdownMenu.vue'
import ButtonNew from './ButtonNew.vue'

const router = useRouter()

const goToHome = () => {
    router.push('/')
}

const goToAbout = () => {
    router.push('/about')
}

const goToSignUp = () => {
    router.push('/signup')
}

</script>

<template>
    <div class="bg-transparent flex flex-row items-center justify-between p-4 z-50 drop-shadow-sm">
        <div @click="goToHome" class="flex flex-row justify-start gap-1 hover:cursor-pointer">
            <Logo/>
            <label class="font-semibold text-xl hover:cursor-pointer">Petlify</label>
        </div>

        <div class="flex flex-row items-center justify-end gap-4">
            <NavbarMenu nav-title="Home" @click="goToHome"/>

            <NavbarMenu nav-title="About" @click="goToAbout"/>
        </div>

        <!-- If logged in user is owner -->
        <template v-if="''">
            <NavbarMenu nav-title="My Pets"/>

            <NavbarMenu nav-title="Appointments"/>

            <DropdownMenu/>
        </template>

        <!-- If logged in user is groomer -->
        <template v-if="''">
            <NavbarMenu nav-title="Upcoming Appointments"/>

            <NavbarMenu nav-title="My Services"/>

            <DropdownMenu/>
        </template>

        <template v-else>
            <div class="w-1/6">
                <ButtonNew @click="goToSignUp" text="Sign Up" rounded="sm" size="large"/>
            </div>
        </template>
    </div>
</template>