<script setup>
import Navbar from '../components/Navbar.vue';
import Input from '../components/Input.vue';
import InputNew from '../components/InputNew.vue';
import ButtonNew from '../components/ButtonNew.vue';

import { useRouter } from 'vue-router';
const router = useRouter()

const goToProfile = () => {
    router.push('/profile')
}

</script>

<template>
    <Navbar/>

    <div class="flex flex-col items-center justify-center gap-12 m-auto w-screen">
        <div class="flex flex-col text-center gap-2 p-4">
            <label class="text-3xl font-semibold">Login</label>
            <label class="text-sm font-light">Welcome back!</label>
        </div>

        <div class="flex flex-col gap-16">
            <InputNew label="Email" :show-rules="true"/>

            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-8 items-end">
                    <InputNew label="Password" :show-rules="true"/>

                    <router-link to="/forgotPassword">
                        <label class="text-black text-sm font-light ml-1 hover:underline hover:cursor-pointer">
                            Forgot Password?
                        </label>
                    </router-link>
                </div>
            </div>

            <div class="flex flex-col justify-center items-center gap-2">
                <ButtonNew text="Login" rounded="sm" class="default" @click="goToProfile"/>
                
                <label class="font-light text-slate-600">
                Don't have an account? 
                <router-link to="/signup">
                    <label class="text-black hover:underline hover:cursor-pointer">Sign up</label>
                </router-link>
            </label>
            </div>

        </div>
    </div>
</template>