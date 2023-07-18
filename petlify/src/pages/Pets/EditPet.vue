<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import Input from '@/components/Input.vue'
import InputNew from '@/components/InputNew.vue';
import ButtonNew from '@/components/ButtonNew.vue'

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePetStores } from '../../stores/pets';
import { createPinia } from 'pinia';

const router = useRouter()
const route = useRoute()
const petStore = usePetStores()

const petID = ref(null)
const petName = ref(null)
const petDOB = ref(null)
const petSpecies = ref(null)
const petBreed = ref(null)
const petColour = ref(null)
const petWeight = ref(null)

const editPet = async () => {

    const updatedPetName = petName.value
    const dateOfBirth = petDOB.value
    const species = petSpecies.value
    const breed = petBreed.value
    const updatedPetColour = petColour.value
    const updatedWeight = petWeight.value
    
    await petStore.updatePet(petID.value, updatedPetName, dateOfBirth, species, breed, updatedPetColour, updatedWeight)

    router.push(`/petProfile/${petID.value}`)
}

onMounted( async () => {
    const currentPet = await petStore.getPetByID(route.params.id)
    petID.value = currentPet.id

    if(currentPet) {
        petName.value = currentPet.name
        petDOB.value = currentPet.dateOfBirth
        petSpecies.value = currentPet.species
        petBreed.value = currentPet.breed
        petColour.value = currentPet.color
        petWeight.value = currentPet.weightInKG
    }
})

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

                <Input 
                    label="Pet Name"
                    placeholder="Pet Name"
                    :value="petName" 
                    @update:value="petName = $event"
                />

                <Input 
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    :value="petDOB" 
                    :disabled="true"
                    @update:value="petDOB = $event"
                />
            </div>

            <div class="flex flex-row gap-8">

                <Input 
                    label="Species"
                    placeholder="Species"
                    :value="petSpecies" 
                    :disabled="true"
                />

                <Input 
                    label="Breed"
                    placeholder="Breed"
                    :value="petBreed" 
                    :disabled="true"
                />
            </div>

            <div class="flex flex-row gap-8">

                <Input 
                    label="Colour"
                    placeholder="Colour"
                    :value="petColour" 
                    @update:value="petColour = $event"
                />

                <Input 
                    label="Weight"
                    placeholder="Weight"
                    :value="petWeight" 
                    @update:value="petWeight = $event"
                />
                
            </div>


            <ButtonNew text="Save" rounded="sm" @click="editPet"/>
        </div>

        <div class="mx-4 my-16 justify-self-end text-right hover:underline hover:text-red-600" @click="deletePet">
            <label class="font-light text-sm hover:cursor-pointer">Delete Pet</label>
        </div>
    </div>
    <Footer/>
</template>