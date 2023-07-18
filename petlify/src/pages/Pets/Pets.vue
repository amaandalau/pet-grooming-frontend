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

const authStore = useAuthStores()
const userStore = useUserStores()
const petStore = usePetStores()

const petData = ref([])
const petName = ref(null)
const petAge = ref(null)
const petDOB = ref(null)
const petSpecies = ref(null)
const petBreed = ref(null)
const petColour = ref(null)
const petWeight = ref(null)

const hasPets = computed(() => petData.value.length > 0)

const getUserPets = async () => {
    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id
    
    // const userPets = await petStore.getPetsByOwnerID(userID)
    // console.log('Get User Pets: ', userPets)

    petData.value = await petStore.getPetsByOwnerID(userID)
    // const pet = await petStore.getPetsByOwnerID(userID)

    const noOfPets = petData.value.length
    console.log('No of Pets', noOfPets)

    // console.log("Pet", pet)

    // if(noOfPets > 0) {
    //     const pet = petData.value[0]

    //     petName.value = pet.name
    //     petAge.value = pet.age
    //     petDOB.value = pet.dateOfBirth
    //     petSpecies.value = pet.species
    //     petBreed.value = pet.breed
    //     petColour.value = pet.color
    //     petWeight.value = pet.weightInKG
    // }

}

onMounted(async () => {
   await getUserPets()
})

</script>

<template>
    <Navbar/>

    <div class="min-h-screen flex flex-col items-center gap-10">
        <div class="block">
            <label class="text-2xl font-bold">My Pets</label>
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
                    />
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