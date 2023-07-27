<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import Input from '@/components/Input.vue'
import InputNew from '@/components/InputNew.vue';
import ButtonNew from '@/components/ButtonNew.vue'

import VueDatePicker from '@vuepic//vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStores } from '@/stores/auth.js'
import { usePetStores } from '../../stores/pets.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStores()
const petStore = usePetStores()

const petName = ref(null)
const petDOB = ref(null)
const species = ref(null)
const breed = ref(null)
const colour = ref(null)
const weight = ref(null)

const createPet = async () => {
    const petNameValue = petName.value
    const dateOfBirthValue = petDOB.value
    const speciesValue = species.value
    const breedValue = breed.value
    const colourValue = colour.value
    const weightValue = parseFloat(weight.value)

    const currentUser = await authStore.getCurrentUser()
    const ownerID = currentUser.id

    await petStore.createPet(petNameValue, dateOfBirthValue, speciesValue, breedValue, colourValue, weightValue, ownerID)
    console.log('Pet Created', petNameValue, dateOfBirthValue, speciesValue, breedValue, colourValue, weightValue, ownerID
    )

    router.push(`/${ownerID}/pets`)
}

const goToPetList = async () => {
    const currentUser = await authStore.getCurrentUser()
    const ownerID = currentUser.id

    router.push(`/${ownerID}/pets`)
} 

</script>

<template>
    <Navbar/>
    <div class="my-4 min-h-screen flex flex-col items-center">

        <label class="font-semibold text-2xl">Create New Pet Profile</label>
        <div class="border-2 border-black rounded-full h-40 w-40 m-8">
            <!-- Avatar -->
            <img src="../../assets//illustrations//purr-traveler-cat.png" alt=""
            class="object-contaiin h-full w-full rounded-full"
            >
        </div>

        <div class="flex flex-col items-center gap-16">

            <div class="flex flex-col items-center justify-between gap-8">

                <Input 
                    label="Pet Name"
                    placeholder="Pet Name"
                    :value="petName" 
                    @update:value="petName = $event"
                />

                <div class="flex flex-col w-full">
                    <label>Date of Birth</label>
                    
                    <VueDatePicker
                    v-model="petDOB"
                    :enable-time-picker="false"
                    :clearable="true"
                    placeholder="Pet D.O.B"
                    :close-on-auto-apply="true"
                    :show-now-button="false"
                    width="400"
                    ></VueDatePicker>

                    <p class="mt-1 font-extralight text-xs italic">*Date of Birth cannot be changed after creating</p>
                </div>

            </div>

            <div class="flex flex-row gap-8">

                <div class="flex flex-col gap-1">
                    <Input
                    label="Species"
                    placeholder="Species"
                    :value="species"
                    @update:value="species = $event"
                    />

                    <p class="mt-1 font-extralight text-xs italic">*Species cannot be changed after creating</p>

                </div>

                <div class="flex flex-col gap-1">
                    <Input
                    label="Breed"
                    placeholder="Breed"
                    :value="breed"
                    @update:value="breed = $event"
                    />

                    <p class="mt-1 font-extralight text-xs italic">*Breed cannot be changed after creating</p>

                </div>
            </div>

            <div class="flex flex-row gap-8">

                <div class="flex flex-col gap-1">
                    <Input
                    label="Colour"
                    placeholder="Colour"
                    :value="colour"
                    @update:value="colour = $event"
                    />

                    <p class="mt-1 font-extralight text-xs italic">*Colour cannot be changed after creating</p>

                </div>

                <div class="flex flex-col gap-1">
                    <Input
                    label="Weight (in KG)"
                    placeholder="Weight (in KG)"
                    :value="weight"
                    @update:value="weight = $event"
                    />

                    <p class="mt-1 font-extralight text-xs italic">‎</p>
                </div>
            </div>


            <div class="flex flex-col items-center justify-between w-full gap-4">
                <ButtonNew text="Create" class="default" rounded="sm" @click="createPet"/>

                <label @click="goToPetList"
                        class="font-light text-red-600 hover:underline hover:cursor-pointer">
                        Cancel
                </label>
            </div>
        </div>
    </div>
    <Footer/>
</template>