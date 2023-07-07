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
            <label class="text-3xl font-semibold">Reset your password</label>
            <label class="text-sm font-light">Set a new password</label>
        </div>

        <div class="flex flex-col gap-16">
            <InputNew label="Password" :show-rules="true" placeholder="Enter your new password"/>

            <ButtonNew text="Reset password" rounded="sm"/>

            <router-link to="/login">
                <div class="flex justify-center">
                    <label class="font-light text-sm text-slate-800 hover:underline hover:cursor-pointer">
                        Login
                    </label>
                </div>
            </router-link>

        </div>
    </div>
</template>