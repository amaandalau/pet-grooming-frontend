<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import ButtonNew from '@/components/ButtonNew.vue'

import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePetStores } from '../../stores/pets.js'
import { useAuthStores } from '../../stores/auth';

const router = useRouter()
const route = useRoute()
const authStore = useAuthStores()
const petStore = usePetStores()

const name = ref(null)
const dob = ref(null)
const species = ref(null)
const breed = ref(null)
const colour = ref(null)
const weight = ref(null)

const formattedDOB = computed(() => {
    if(dob.value) {
        const date = new Date(dob.value)
        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }
        return date.toLocaleDateString('en-GB', options)
    }

    return ''
})

onMounted(async () => {
    console.log('Route?', route.params.id)

    const petID = route.params.id
    console.log('Pet Profile PetID: ', petID)

    const pet = await petStore.getPetByID(petID)
    console.log('Pet Profile:', pet)

    if(pet) {
        name.value = pet.name
        dob.value = pet.dateOfBirth
        species.value = pet.species
        breed.value = pet.breed
        colour.value = pet.color
        weight.value = pet.weightInKG
    }
})

const goToEditPet = () => {
    router.push(`/editPet/${route.params.id}`)
}

const goToMakeAppt = () => {
    router.push(`/${route.params.id}/createPetAppt`)
}

const deletePet = async () => {

    const petID = route.params.id

    const currentPet = await petStore.getPetByID(petID)

    const currentUser = await authStore.getCurrentUser()

    if(currentPet.ownerID === currentUser.id) {
        await petStore.deletePet(currentPet.id)

        router.push(`/${currentUser.id}/pets`)
    }
}

</script>

<template>
    <Navbar :user-logged-in="true"/>

    <div class="flex flex-row justify-center items-center min-h-screen">

        <div class="w-full min-h-screen flex flex-1 flex-col items-center justify-between">

            <div class="flex flex-col w-full">

                <label class="text-center text-2xl font-bold">Pet Profile</label>
                    <div class="mx-4 my-2 block text-right hover:underline" @click="goToEditPet">
                        <label class="font-light text-sm hover:cursor-pointer">Edit Pet</label>
                    </div>

                <div class="flex flex-col items-center">

                    
                    <div class="border-2 border-slate-950  rounded-full h-40 w-40 m-8">
                        <!-- Avatar -->
                        <img src="../../assets//illustrations/purr-traveler-cat.png" alt=""
                        class="object-contain h-full w-full rounded-full"
                        >
                    </div>
                    
                    <div class="flex flex-col items-center gap-2">
                        <label class="font-semibold text-xl">{{ name }}</label>
                        <label class="font-light text-base">{{ formattedDOB }}</label>
                        <label class="mt-4">{{ species }}</label>
                        <label class="mt-4">{{ breed }}</label>
                        <label class="mt-4">{{ colour }}</label>
                        <label class="mt-4">{{ weight }} KG</label>
                    </div>
                </div>

                <div class="w-1/3 flex items-center mx-auto my-6">
                    <ButtonNew @click="goToMakeAppt" text="Make an appointment" rounded="lg" elevation="0" size="large"/>
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