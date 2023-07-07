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
            <label class="text-3xl font-semibold">Sign Up</label>
            <label class="text-sm font-light">Let's get started</label>
        </div>

        <div class="flex flex-col gap-16">
            <InputNew label="Name"/>
            <InputNew label="Email"/>
            <InputNew label="Password"/>

            <div class="flex flex-col justify-center items-center gap-2">
                <ButtonNew text="Sign Up" rounded="lg"/>

            <label class="font-light text-slate-600">
                Have an account? 
                <router-link to="/login">
                    <label class="text-black hover:underline hover:cursor-pointer">Log in</label>
                </router-link>
            </label>
            </div>
        </div>
    </div>
</template>