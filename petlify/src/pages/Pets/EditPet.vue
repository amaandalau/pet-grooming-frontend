<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import InputNew from '@/components/InputNew.vue';
import ButtonNew from '@/components/ButtonNew.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const name= ref('John Doe')

const goToPetProfile = () => {
    router.push('/petProfile')
} 

</script>

<template>
    <Navbar :user-logged-in="true"/>
    <div class="min-h-screen flex flex-col items-center">

        <label class="font-semibold text-2xl">Edit Pet</label>
        <div class="border border-black rounded-full h-40 w-40 m-8">
            <!-- Avatar -->
            <img src="https://images.unsplash.com/photo-1600585594245-0eb3fe7f1474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80" alt=""
            class="object-fit h-full w-full rounded-full"
            >
        </div>

        <div class="flex flex-col items-center gap-16">

            <div class="flex flex-row gap-8">
                <InputNew :value="name" :show-rules="false"/>
                <InputNew :readonly="false" value="30 September 2018"/>
            </div>

            <div class="flex flex-row gap-8">
                <InputNew :readonly="true" :disabled="true" value="Dog"/>
                <InputNew :readonly="true" :disabled="true" value="French Bulldog"/>
            </div>

            <div class="flex flex-row gap-8">
                <InputNew :readonly="false" value="White with Black Spots"/>
                <InputNew :readonly="true" value="5.30 KG"/>
            </div>


            <ButtonNew text="Save" rounded="sm" @click="goToPetProfile"/>
        </div>
    </div>
    <Footer/>
</template>