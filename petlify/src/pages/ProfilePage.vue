<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue'

import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStores } from '../stores/auth';
import { useUserStores } from '../stores/users';
import { onMounted } from 'vue';


const router = useRouter()
const route = useRoute()
const authStore = useAuthStores()
const userStore = useUserStores()

const currentUser = computed(() => authStore.currentUser)

const goToEditProfile = () => {
    console.log('Current User Value ID', currentUser.value.id)
    router.push(`/editProfile/${currentUser.value.id}`)
}

const name = ref(null)
const email = ref(null)
const role = ref(null)
let userID = ref(null)

onMounted(async () => {
    userID.value = route.params.id
    const user = await userStore.getUserByID(userID.value)

    if(user) {
        name.value = user.name
        email.value = user.email

        if (user.role === 'owner') {
            return role.value = 'Pet Owner'
        } else if (user.role === 'groomer') {
            return role.value = 'Pet Groomer'
        } else if (user.role === 'admin') {
            return role.value = 'Admin'
        } else {
            return 'User Role'
        }
    } 
})


// onMounted(async () => {
//     const userData = await authStore.getCurrentUser()

//     if(userData) {
//         currentUser.value = userData
//     }
// })

</script>

<template>
    <Navbar :user-logged-in="true"/>

    <div class="flex flex-row justify-center items-center min-h-screen">
        <div class="w-1/2 h-screen flex items-center justify-center rounded-r-3xl bg-slate-100 drop-shadow-md">
            <!-- Dog Pic -->
            <img src="../assets/illustrations/purr-22.png" alt=""
                class="object-contain"
            >
        </div>

        <div class="w-1/2 min-h-screen flex flex-1 flex-col items-center justify-between">

            <div class="flex flex-col w-full">
                    <div class="mx-4 my-2 justify-self-end text-right hover:underline" @click="goToEditProfile">
                        <label class="font-light text-sm hover:cursor-pointer">Edit Profile</label>
                    </div>

                <div class="flex flex-col items-center">

                    
                    <div class="border border-black rounded-full h-40 w-40 m-8">
                        <!-- Avatar -->
                        <img src="../assets//illustrations//purr-half-cat-1.png" alt=""
                        class="object-contain h-full w-full rounded-full"
                        >
                    </div>
                    
                    <div class="flex flex-col items-center gap-2" v-if="currentUser">
                        <label class="font-semibold text-xl">{{ name }}</label>
                        <label class="font-light text-base">{{ email }}</label>
                        <label class="mt-4">{{ role }}</label>
                    </div>
                </div>
            </div>

            <div class="flex justify-center my-4">
                <label @click="deactivateAccount()"
                    class="font-light text-sm text-red-600 hover:font-bold hover:cursor-pointer hover:underline">
                    Deactivate account
                </label>
            </div>
        </div>
    </div>
    <Footer/>

</template>