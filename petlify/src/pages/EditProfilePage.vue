<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue'
import Input from '../components/Input.vue';
import InputNew from '../components/InputNew.vue'
import ButtonNew from '../components/ButtonNew.vue'

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStores } from '../stores/users';
import { useAuthStores } from '../stores/auth';

const router = useRouter()
const route = useRoute()

const { currentUser } = useAuthStores()
const authStore = useAuthStores()
const userStore = useUserStores()

const name = ref(null)
const email = ref(null)
const role = ref(null)

const editUser = async () => {
    const updatedName = name.value
    const updatedEmail = email.value

    console.log('Edit User Checkpoint 1: ', updatedName, updatedEmail)

    await userStore.updateUser(updatedName, updatedEmail)
    console.log('User Updated')

    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id
    router.push(`/profile/${userID}`)
}

const deactivateAccount = async () => {
    const user = await authStore.getCurrentUser()

    if(user.id) {
        await userStore.deleteUser(user.id)
        console.log('User Deleted')
        router.push('/')
    }
}

const cancelEdit = async () => {
    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id
    router.push(`/profile/${userID}`)
}

onMounted(async () => {
    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id

    console.log('On Mounted User ID: ', userID)

    const user = await userStore.getUserByID(userID)
    console.log('On Mounted User', user)

    if(user) {
        name.value = user.name
        email.value = user.email

        switch(user.role) {
            case 'owner' :
                role.value = 'Pet Owner'
                break;
            
            case 'groomer' :
                role.value = 'Pet Groomer'
                break;
            
            case 'admin' :
                role.value = 'Admin'

            default :
                role.value = 'User Role'
        }
    }
})

</script>

<template>
    <Navbar/>

    <div class="flex flex-row justify-center">
        <div class="w-1/2 flex items-center justify-center rounded-r-3xl bg-slate-100 drop-shadow-md">
            <!-- Dog Pic -->
            <img src="../assets/illustrations/purr-22.png" alt=""
                class="object-contain"
            >
        </div>

        <div class="w-1/2 min-h-screen mb-4 flex flex-1 flex-col items-center justify-between">

            <div class="flex flex-col w-full">
                <div class="mx-4 my-2 justify-self-end text-center">
                    <label class="font-bold text-2xl">Edit Profile</label>
                </div>

                <div class="flex flex-col items-center">

                    
                    <div class="border-2 border-black rounded-full h-40 w-40 m-8">
                        <!-- Avatar -->
                        <img src="../assets//illustrations/purr-half-cat-1.png" alt=""
                        class="object-contain h-full w-full rounded-full"
                        >
                    </div>

                    <div class="flex flex-col justify-between items-center gap-8">
                        <Input :value="name" @update:value="name = $event"/>
                        <Input :value="email" @update:value="email = $event"/>

                        <div class="flex flex-col gap-1">
                            <Input :disabled="true" :value="role"/>
                            <p class="text-xs font-light italic">Role cannot be updated</p>
                        </div>
                        <!-- Role cannot be updated -->

                        <div class="flex flex-col gap-4 justify-between items-center w-full">
                            <ButtonNew text="Save" rounded="sm" class="default" @click="editUser"/>
                            <label @click="cancelEdit"
                            class="font-light text-sm text-red-600 hover:font-bold hover:cursor-pointer hover:underline">
                            Cancel
                        </label>
                    </div>
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