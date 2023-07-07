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

                <ButtonNew text="Login" rounded="lg"/>
            </div>

        </div>
    </div>
</template>