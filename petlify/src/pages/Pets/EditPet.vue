<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import Input from '@/components/Input.vue'
import InputNew from '@/components/InputNew.vue';
import ButtonNew from '@/components/ButtonNew.vue'

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePetStores } from '../../stores/pets';
import { useUserStores } from '../../stores/users';
import { useAuthStores } from '../../stores/auth';

const router = useRouter()
const route = useRoute()
const authStore = useAuthStores()
const userStore = useUserStores()
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

const deletePet = async () => {
    // try {
    //     const currentUser = await authStore.getCurrentUser()
    //     const userID = currentUser.id

    //     const currentPet = await petStore.getPetByID(route.params.id)

    //     if(currentPet.ownerID === userID) {
    //         await petStore.deletePet(route.params.id)
    //         console.log('Pet Deleted Succesfully')
    //         router.push(`/${userID}/pets`)
    //     } else {
    //         console.log('Not authorized lerh')
    //     }

    // } catch (error) {
    //     console.error(error)
    // }

    const currentPet = await petStore.getPetByID(route.params.id)
    // console.log('Del Pet: ', currentPet, currentPet.id, currentPet.ownerID)

    const currentUser = await authStore.getCurrentUser()
    // console.log('Current User ID', currentUser.id)

    if(currentPet.ownerID === currentUser.id) {
        await petStore.deletePet(currentPet.id)
        console.log('Pet Deleted')

        router.push(`/${currentUser.id}/pets`)
    }
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
            <img src="../../assets//illustrations//purr-traveler-cat.png" alt=""
            class="object-contain h-full w-full rounded-full"
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


            <ButtonNew text="Save" rounded="sm" class="default" @click="editPet"/>
        </div>

        <div class="mx-4 my-16 justify-self-end text-right hover:underline hover:text-red-600" @click="deletePet">
            <label class="font-light text-sm hover:cursor-pointer">Delete Pet</label>
        </div>
    </div>
    <Footer/>
</template>