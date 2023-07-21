<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import Input from '@/components/Input.vue'
import InputNew from '@/components/InputNew.vue';
import ButtonNew from '@/components/ButtonNew.vue'

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStores } from '@/stores/auth.js'
import { usePetStores } from '../../stores/pets.js'

const router = useRouter()
const authStore = useAuthStores()
const petStore = usePetStores()

const petName = ref(null)
const dob = ref(null)
const species = ref(null)
const breed = ref(null)
const colour = ref(null)
const weight = ref(null)

const createPet = async () => {
    const petNameValue = petName.value
    const dateOfBirthValue = dob.value
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

</script>

<template>
    <Navbar :user-logged-in="true"/>
    <div class="my-4 min-h-screen flex flex-col items-center">

        <label class="font-semibold text-2xl">Create New Pet Profile</label>
        <div class="border-2 border-black rounded-full h-40 w-40 m-8">
            <!-- Avatar -->
            <img src="../../assets//illustrations//purr-traveler-cat.png" alt=""
            class="object-contaiin h-full w-full rounded-full"
            >
        </div>

        <div class="flex flex-col items-center gap-16">

            <div class="flex flex-row gap-8">
                <!-- <InputNew label="Pet Name" v-model="petName"/> -->
                <!-- <InputNew label="Date of Birth" /> -->

                <Input 
                    label="Pet Name"
                    placeholder="Pet Name"
                    :value="petName" 
                    @update:value="petName = $event"
                />

                <Input 
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    :value="dob" 
                    @update:value="dob = $event"
                />

            </div>

            <div class="flex flex-row gap-8">
                <!-- <InputNew label="Species"/>
                <InputNew label="Breed"/> -->

                <Input
                    label="Species"
                    placeholder="Species"
                    :value="species"
                    @update:value="species = $event"
                />

                <Input
                    label="Breed"
                    placeholder="Breed"
                    :value="breed"
                    @update:value="breed = $event"
                />
            </div>

            <div class="flex flex-row gap-8">
                <!-- <InputNew label="Colour"/>
                <InputNew label="Weight (in KG)"/> -->

                <Input
                    label="Colour"
                    placeholder="Colour"
                    :value="colour"
                    @update:value="colour = $event"
                />

                <Input
                    label="Weight (in KG)"
                    placeholder="Weight (in KG)"
                    :value="weight"
                    @update:value="weight = $event"
                />
            </div>


            <ButtonNew text="Create" rounded="sm" @click="createPet"/>
        </div>
    </div>
    <Footer/>
</template>