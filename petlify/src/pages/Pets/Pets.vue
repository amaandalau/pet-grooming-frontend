<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import PetProfileCard from '@/components/PetProfileCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import ButtonNew from '@/components/ButtonNew.vue'

import { computed, onMounted, ref } from 'vue';
import { useAuthStores } from '../../stores/auth';
import { useUserStores } from '../../stores/users';
import { usePetStores } from '../../stores/pets'
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStores()
const userStore = useUserStores()
const petStore = usePetStores()

const router = useRouter()
const route = useRoute()

const petData = ref([])

const hasPets = computed(() => petData.value.length > 0)

const getUserPets = async () => {
    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id

    petData.value = await petStore.getPetsByOwnerID(userID)

    const noOfPets = petData.value.length
    console.log('No of Pets', noOfPets)

}

const goToPetProfile = async (petID) => {

    const pet = await petStore.getPetByID(petID)
    console.log('Pet Profile: ', pet)

    router.push(`/petProfile/${petID}`)

}

const goToAddNewPet = () => {
    router.push('/createPet')
}

const goToEditPet = (petID) => {
    router.push(`/editPet/${petID}`)
}

const goToMakeAppt = async (petID) => {

    const pet = await petStore.getPetByID(petID)
    router.push(`/${petID}/createPetAppt`)
}

onMounted(async () => {
    getUserPets()
})

</script>

<template>
    <Navbar/>

    <div class="min-h-screen flex flex-col gap-10">
        <div class="flex flex-row items-center justify-between ml-14 mr-8">
            <label class="inline text-2xl font-bold flex-grow-1">My Pets</label>
            <p class="inline text-right font-light text-xs hover:cursor-pointer hover:underline" @click="goToAddNewPet">Add New Pet</p>
        </div>

        <!-- Pets Gallery -->
        <div v-if="hasPets" class="flex flex-row items-center gap-10 px-12 pb-12 w-screen overflow-x-scroll">

            <template v-for="pet in petData" :key="pet.id">
                <div class="flex-shrink-0">
                    <PetProfileCard
                        :pet-name="pet.name"
                        :age="pet.age"
                        :date-of-birth="pet.dateOfBirth"
                        :species="pet.species"
                        :breed="pet.breed"
                        :colour="pet.color"
                        :weight="pet.weightInKG"
                        @petProfileClicked="goToPetProfile(pet.id)"
                        @editPetClicked="goToEditPet(pet.id)"
                    />
                    <ButtonNew 
                        text="Make an appointment" 
                        rounded="lg"
                        class="default"
                        @click="goToMakeAppt(pet.id)"/>
                </div>
            </template>
            
        </div>

        <template v-else>
            <div class="flex flex-col justify-between gap-4">
                <EmptyState text="You have no pets yet"/>

                <ButtonNew text="Create New Pet"/>
            </div>
        </template>
    </div>

    <Footer/>
</template>