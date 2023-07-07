<script setup>
import Navbar from '../components/Navbar.vue';
import Input from '../components/Input.vue';
import InputNew from '../components/InputNew.vue';
import ButtonNew from '../components/ButtonNew.vue';

</script>

<template>
    <Navbar/>

    <div class="flex flex-col items-center justify-center gap-12 m-auto w-screen">
        <div class="flex flex-col text-center gap-2 p-4">
            <label class="text-3xl font-semibold">Forgot password?</label>
            <label class="text-sm font-light">No worries, we gotchu!</label>
        </div>

        <div class="flex flex-col gap-16">
            <InputNew label="Email" :show-rules="true" placeholder="Enter your email"/>

            <ButtonNew text="Reset password" rounded="sm"/>

            <router-link to="/login">
                <div class="flex justify-center">
                    <label class="font-light text-sm text-slate-800 hover:underline hover:cursor-pointer">
                        Back to log in
                    </label>
                </div>
            </router-link>
            <!-- <div class="flex flex-col justify-center items-center gap-2">
                <ButtonNew text="Login" rounded="lg"/>
                <label class="font-light text-slate-600">
                Don't have an account? 
                <router-link to="/signup">
                    <label class="text-black hover:underline hover:cursor-pointer">Sign up</label>
                </router-link>
            </label>
            </div> -->

        </div>
    </div>
</template>