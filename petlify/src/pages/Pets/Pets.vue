<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PetProfileCard from '../../components/PetProfileCard.vue';
</script>

<template>
    <Navbar :user-logged-in="true"/>


        <div class="flex flex-col min-h-screen min-w-screen overflow-x-scroll  items-center">
            <label class="text-2xl font-bold">My Pets</label>

            <div class="my-4">
                <PetProfileCard/>
            </div>
        </div>

    <Footer/>

</template>