<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePetStores } from '../../stores/pets.js'


const router = useRouter()
const store = usePetStores()

const goToEditPet = () => {
    router.push('/editPet')
}

const deletePet = async () => {
    await store.deletePet()
    console.log('Pet Deleted')
    router.push('/pets')

}

const name = ref('Pet Name')
const age = ref(5)
const species = ref('Dog')
const breed = ref('French Bulldog')
const colour = ref('White with Black Spots')
const weight = ref('5.30')

</script>

<template>
    <Navbar :user-logged-in="true"/>

    <div class="flex flex-row justify-center items-center min-h-screen">

        <div class="w-full min-h-screen flex flex-1 flex-col items-center justify-between">

            <div class="flex flex-col w-full">

                <label class="text-center text-2xl font-bold">Pet Profile</label>
                    <div class="mx-4 my-2 justify-self-end text-right hover:underline" @click="goToEditPet">
                        <label class="font-light text-sm hover:cursor-pointer">Edit Pet</label>
                    </div>

                <div class="flex flex-col items-center">

                    
                    <div class="border border-black rounded-full h-40 w-40 m-8">
                        <!-- Avatar -->
                        <img src="https://images.unsplash.com/photo-1600585594245-0eb3fe7f1474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80" alt=""
                        class="object-fit h-full w-full rounded-full"
                        >
                    </div>
                    
                    <div class="flex flex-col items-center gap-2">
                        <label class="font-semibold text-xl">{{ name }}</label>
                        <label class="font-light text-base">{{ age }} years old</label>
                        <label class="mt-4">{{ species }}</label>
                        <label class="mt-4">{{ breed }}</label>
                        <label class="mt-4">{{ colour }}</label>
                        <label class="mt-4">{{ weight }} KG</label>
                    </div>
                </div>
            </div>

            <div class="flex justify-center my-4">
                <label @click="deletePet"
                    class="font-light text-red-600 hover:font-bold hover:cursor-pointer hover:underline">
                    Delete Pet
                </label>
            </div>
        </div>
    </div>
    <Footer/>

</template>