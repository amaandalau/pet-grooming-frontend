<script setup>
import ButtonNew from '../components/ButtonNew.vue';
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

</script>

<template>
    <Navbar/>
    
    <!-- <div class="m-auto text-center flex flex-col">
        <label class="text-5xl font-bold font-sans">
            Beautify A Pet
        </label>

        <label>
            Groom your pet OR Groom a pet
        </label>

        <router-link to="/signup">
            <ButtonNew title="Sign Up Now"/>
        </router-link>

        <router-link to="/login">
            <label class="text-sm font-light text-gray-600 hover:cursor-pointer hover:underline">Have an account? Login</label>
        </router-link>
    </div> -->

    <div class="flex flex-col justify-center items-center gap-10 min-h-screen max-h-screen">
        <div class="flex flex-col justify-center items-center gap-2">
            <label class="text-6xl font-extrabold">
                Beautify A Pet
            </label>
            <label class="text-md font-light">Groom your pet OR Groom a pet, your choice</label>
        </div>

        <div>
            <router-link to="/signup">
                <ButtonNew text="Get Started" rounded="sm"/>
            </router-link>
        </div>
    </div>

    <Footer/>
</template>
