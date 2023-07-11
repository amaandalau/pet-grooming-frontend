<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import InputNew from '@/components/InputNew.vue';
import ButtonNew from '@/components/ButtonNew.vue'

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStores } from '@/stores/auth.js'
import { usePetStores } from '../../stores/pets.js'

const router = useRouter()
const store = usePetStores()

const petName = ref('')
const dob = ref('')
const species = ref('')
const breed = ref('')
const colour = ref('')
const weight = ref('')

const getCurrentUser = () => {
    return useAuthStores().getCurrentUser
} 

const createPet = async () => {
    const petNameValue = petName.value
    const dateOfBirthValue = dob.value
    const speciesValue = species.value
    const breedValue = breed.value
    const colourValue = colour.value
    const weightValue = weight.value

    const user = getCurrentUser()
    const ownerID = user.id

    await store.createPet(petNameValue, dateOfBirthValue, speciesValue, breedValue, colourValue, weightValue, ownerID)
    console.log('Pet Created')

    router.push('/petProfile')
} 

</script>

<template>
    <Navbar :user-logged-in="true"/>
    <div class="min-h-screen flex flex-col items-center">

        <label class="font-semibold text-2xl">Create New Pet Profile</label>
        <div class="border border-black rounded-full h-40 w-40 m-8">
            <!-- Avatar -->
            <img src="https://images.unsplash.com/photo-1600585594245-0eb3fe7f1474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80" alt=""
            class="object-fit h-full w-full rounded-full"
            >
        </div>

        <div class="flex flex-col items-center gap-16">

            <div class="flex flex-row gap-8">
                <InputNew label="Pet Name" v-model="petName"/>
                <InputNew label="Date of Birth" />
            </div>

            <div class="flex flex-row gap-8">
                <InputNew label="Species"/>
                <InputNew label="Breed"/>
            </div>

            <div class="flex flex-row gap-8">
                <InputNew label="Colour"/>
                <InputNew label="Weight (in KG)"/>
            </div>


            <ButtonNew text="Create" rounded="sm" @click="createPet"/>
        </div>
    </div>
    <Footer/>
</template>