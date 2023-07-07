<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import InputNew from '../components/InputNew.vue';
import ButtonNew from '../components/ButtonNew.vue';

</script>

<template>
    <Navbar/>

    <div class="flex flex-col items-center justify-center gap-12 m-auto min-h-screen w-screen">
        <div class="flex flex-col text-center gap-2 p-4">
            <label class="text-3xl font-semibold">Change your password</label>
            <label class="text-sm font-light">Change your password at any time</label>
        </div>

        <div class="flex flex-col gap-16">
            <InputNew label="Current Password" :show-rules="true" placeholder="Enter your old password"/>
            <InputNew label="New Password" :show-rules="true" placeholder="Enter your new password"/>

            <ButtonNew text="Change password" rounded="sm"/>

            <router-link to="/">
                <div class="flex justify-center">
                    <label class="font-light text-sm text-slate-800 hover:underline hover:cursor-pointer">
                        Home
                    </label>
                </div>
            </router-link>

        </div>
    </div>

    <Footer/>
</template>