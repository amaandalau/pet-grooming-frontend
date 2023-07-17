<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue'

import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStores } from '../stores/auth';
import { useUserStores } from '../stores/users';

const { currentUser } = useAuthStores()
const authStore = useAuthStores()
const userStore = useUserStores()
const router = useRouter()
const route = useRoute()

const name = ref(null)
const email = ref(null)
const role = ref(null)


const goToEditProfile = async () => {
    console.log('Current User', await authStore.getCurrentUser())    
    const user = await authStore.getCurrentUser()
    
    console.log('Edit Profile - User', user)
    console.log('Testing Edit Profile User ID', user.id)

    router.push(`/editProfile/${user.id}`)
}

const deactivateAccount = async () => {
    const user = await authStore.getCurrentUser()

    console.log('Delete User', user.id)

    if(user.id) {
        await userStore.deleteUser(user.id)
        console.log('User Deleted')
        router.push('/')
    }
}

onMounted(async () => {
    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id

    console.log('On Mounted User Id: ', userID)

    const user = await userStore.getUserByID(userID)
    console.log('On Mounted User', user) 

    if(user) {
        name.value = user.name
        email.value = user.email

        switch (user.role) {
            case 'owner' :
                role.value = 'Pet Owner'
                break;
            
            case 'groomer' :
                role.value = 'Pet Groomer'
                break;
            
            case 'admin' :
                role.value = 'Admin'
                break;

            default: 
                role.value = 'User Role'
        }
    }
})

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
                    <div class="mx-4 my-2 justify-self-end text-right">
                        <label class="font-light text-sm hover:cursor-pointer hover:underline" @click="goToEditProfile">Edit Profile</label>
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