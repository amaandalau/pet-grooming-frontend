<script setup>
import { useRouter } from 'vue-router';
import ButtonNew from './ButtonNew.vue';
import DropdownMenu from './DropdownMenu.vue';
import Logo from './icons/Logo.vue';

import { ref } from 'vue';

const props = defineProps({
    userLoggedIn: {
        type: Boolean,
        default: false
    }
})

const user = ref({
    name: 'John Doe',
    email: 'johndoe@example.com'
})

const router = useRouter()
const logout = () => {
  router.push('/')
}

</script>

<template>
    <div class="bg-transparent flex flex-row items-center justify-between p-4 z-50 drop-shadow-sm">

        <router-link to="/">
            <div class="flex flex-row justify-start gap-1 hover:cursor-pointer">
                <Logo/>
                <label class="font-semibold text-xl hover:cursor-pointer">Petlify</label>
            </div>
        </router-link>

        <div class="flex flex-row justify-evenly gap-4">
            <router-link to="/">
                <ButtonNew class="link" text="Home" size="large" elevation="0"/>
            </router-link>

            <router-link to="/about">
                <ButtonNew class="link" text="About" size="large" elevation="0"/>
            </router-link>

            <!-- <router-link to="/signup">
                <ButtonNew text="Sign Up" rounded="sm" size="large"/>
            </router-link> -->

            <template v-if="userLoggedIn">
                <DropdownMenu @logout="logout" :name="user.name" :email="user.email"/>
            </template>

            <template v-else>
                <router-link to="/signup">
                <ButtonNew text="Sign Up" rounded="sm" size="large"/>
            </router-link>
            </template>
        </div>

    </div>

</template>