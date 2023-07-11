<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoggedInNavbar from '../components/LoggedInNavbar.vue';


const router = useRouter()

const goToEditProfile = () => {
    router.push('/editProfile')
}

const name = ref('John Doe')
const email = ref('johndoe@email.com')
const role = ref('User Role')

</script>

<template>
    <Navbar :user-logged-in="true"/>

    <div class="flex flex-row justify-center items-center min-h-screen">
        <div class="w-1/2">
            <!-- Dog Pic -->
            <img src="https://images.unsplash.com/photo-1521673461164-de300ebcfb17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" alt=""
                class="object-cover h-screen w-full rounded-r-3xl overflow-hidden"
            >
        </div>

        <div class="w-1/2 min-h-screen max-h-screen flex flex-1 flex-col items-center justify-between">

            <div class="flex flex-col w-full">
                    <div class="mx-4 my-2 justify-self-end text-right hover:underline" @click="goToEditProfile">
                        <label class="font-light text-sm hover:cursor-pointer">Edit Profile</label>
                    </div>

                <div class="flex flex-col items-center">

                    
                    <div class="border border-black rounded-full h-40 w-40 m-8">
                        <!-- Avatar -->
                        <img src="https://images.unsplash.com/photo-1600585594245-0eb3fe7f1474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80" alt=""
                        class="object-fit h-full w-full rounded-full"
                        >
                    </div>
                    
                    <div class="flex flex-col items-center gap-2">
                        <label class="font-semibold text-xl">{{ name }}</label>
                        <label class="font-light text-base">{{ email }}</label>
                        <label class="mt-4">{{ role }}</label>
                    </div>
                </div>
            </div>

            <div class="flex justify-center my-4">
                <label @click="deactivateAccount()"
                    class="font-light text-red-600 hover:font-bold hover:cursor-pointer hover:underline">
                    Deactivate account
                </label>
            </div>
        </div>
    </div>
    <Footer/>

</template>