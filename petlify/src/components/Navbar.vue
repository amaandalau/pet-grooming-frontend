<script setup>
import { useRouter } from 'vue-router';
import ButtonNew from './ButtonNew.vue';
import DropdownMenu from './DropdownMenu.vue';
import Logo from './icons/Logo.vue';

import { ref } from 'vue';
import { computed } from 'vue';
import { useAuthStores } from '../stores/auth';
import { onMounted } from 'vue';
import { useUserStores } from '../stores/users';

const props = defineProps({
    userLoggedIn: {
        type: Boolean,
        default: false
    }
})

const name = ref(null)
const email = ref(null)
let userID = ref(null)

const router = useRouter()
const authStore = useAuthStores()
const userStore = useUserStores()

const logout = async () => {
    await authStore.logout()
    router.push('/')
}

const currentUser = ref(null)

// onMounted(async () => {
//     if(props.userLoggedIn) {
//         // currentUser.value = await authStore.getCurrentUser()
//         await authStore.getCurrentUser()
//         currentUser.value = authStore.currentUser
//     }
// })

const getUserData = async () => {
    try {
        const currentUser = await authStore.getCurrentUser()
        return currentUser
    } catch (error) {
        console.error(error)
        return null
    }
}

const user = computed(() => currentUser.value || {})
const isLoggedIn = computed(() => props.userLoggedIn && user.value !== null && user.value.id !== null)


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

            <template v-if="props.userLoggedIn">
                <DropdownMenu @logout="logout" :user="getUserData()"/>
            </template>

            <template v-else>
                <router-link to="/signup">
                <ButtonNew text="Sign Up" rounded="sm" size="large"/>
            </router-link>
            </template>
        </div>

    </div>

</template>