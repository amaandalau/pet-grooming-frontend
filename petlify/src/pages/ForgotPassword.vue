<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import InputNew from '../components/InputNew.vue';
import ButtonNew from '../components/ButtonNew.vue';
import { useRouter } from 'vue-router';

const goToResetPwd = () => {
        const router = useRouter()
        router.push('/resetPassword')
}
 
</script>

<template>
    <Navbar/>

    <div class="flex flex-col items-center justify-center gap-12 m-auto min-h-screen w-screen">
        <div class="flex flex-col text-center gap-2 p-4">
            <label class="text-3xl font-semibold">Forgot password?</label>
            <label class="text-sm font-light">No worries, we'll send you the reset instructions</label>
        </div>

        <div class="flex flex-col gap-16">
            <InputNew label="Email" :show-rules="true" placeholder="Enter your email"/>

            <ButtonNew text="Reset password" rounded="sm" class="default" @click="goToResetPwd"/>

            <router-link to="/login">
                <div class="flex justify-center">
                    <label class="font-light text-sm text-slate-800 hover:underline hover:cursor-pointer">
                        Back to log in
                    </label>
                </div>
            </router-link>

        </div>
    </div>

    <Footer/>
</template>