<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import ButtonNew from '@/components/ButtonNew.vue'
import SelectDropdown from '../../components/SelectDropdown.vue';
import PetApptHeader from '../../components/PetApptHeader.vue';
import { ArrowLeftIcon } from "@heroicons/vue/24/outline"

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VueDatePicker from '@vuepic//vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { useApptStores } from '@/stores/appointments.js'
import { useUserStores } from '../../stores/users';
import { useTimeslotStores } from '../../stores/timeslots'
import { usePetStores } from '../../stores/pets';

const router = useRouter()
const route = useRoute()
const userStore = useUserStores()
const petStore = usePetStores()
const apptStore = useApptStores()
const timeslotStore = useTimeslotStores()

const apptDate = ref()
const specialInstructions = ref('')
const status = ref('pending')
const petID = ref(null)
const ownerID = ref(null)

const groomerList = ref([])
const groomerID = ref(null)
const groomerName = ref(null)
const selectedGroomer = ref(null)

const petName = ref(null)
const petDOB = ref(null)
const petSpecies = ref(null)
const petBreed = ref(null)
const petColour = ref(null)
const petWeight = ref(null)
const petOwner = ref(null)

const getPetData = async () => {

    const petID = route.params.petID
    console.log('Get Pet Data PetID', petID)

    const pet = await petStore.getPetByID(petID)
    const owner = await userStore.getUserByID(pet.ownerID)
    const ownerName = owner.name

    petName.value = pet.name
    petDOB.value = pet.dateOfBirth
    petSpecies.value = pet.species
    petBreed.value = pet.breed
    petColour.value = pet.color
    petWeight.value = pet.weightInKG
    petOwner.value = ownerName

}

const getGroomerList = async () => {
    try {
        const users = await userStore.getAllUsers()

        // Filter groomers
        const groomers = users.filter(user => user.role === 'groomer')
        
        // groomerList.value = groomers
        groomerList.value = groomers.map(groomer => ({
            name: groomer.name,
            id: groomer.id
        }))

        console.log(groomerID.value)
       
        console.log('Groomers (Filtered)', groomerList.value)

    } catch (error) {
        console.error('Failed to fetch groomers', error)
    }
}

const createAppt = async () => {

    const pet = await petStore.getPetByID(route.params.petID)
    const ownerID = pet.ownerID
    const petID = parseInt(route.params.petID)

    const apptDateValue = apptDate.value
    const specialInstructionsValue = specialInstructions.value
    const statusValue = 'pending'
    const timeslotValue = 6 // Just using id from dummy data to pass it


    console.log('Groomer Name', groomerName.value)
    const selectedGroomer = groomerList.value.find(groomer => groomer.name === groomerName.value)
    const groomerIDValue = selectedGroomer ? selectedGroomer.id : null

    console.log('Selected Groomer ID:', groomerIDValue)

    await apptStore.createAppt(apptDateValue, specialInstructionsValue, statusValue, petID, timeslotValue, ownerID, groomerIDValue)
    console.log('Appt:', apptDateValue, specialInstructionsValue, status, petID, timeslotValue, ownerID, groomerIDValue)
    console.log('Appointment Created')

    router.push(`/petProfile/${route.params.petID}`)
}

const goToPetProfile = () => {
    router.push(`/petProfile/${route.params.petID}`)
}

onMounted(() => {
    getPetData()
    getGroomerList()
    
})

</script>

<template>
    <Navbar :user-logged-in="true"/>
    
    <div class="min-h-screen">
        <PetApptHeader
            :header="`Create an Appointment for ${petName}`"
            sub-header="Appointment Details"
            :pet-name="petName"
            :pet-bday="petDOB"
            :pet-species="petSpecies"
            :pet-breed="petBreed"
            :pet-colour="petColour"
            :pet-weight="petWeight"
            :pet-owner="petOwner"
        />

            <div class="mx-10 my-6 flex flex-col gap-8">
                
                    <SelectDropdown 
                        label="Select a Groomer" 
                        :options="groomerList.map(groomer => groomer.name)"
                        v-model="groomerName"
                        :modelValue="groomerName"
                        @update:value="groomerName"
                    />

                    <div class="flex flex-col">
                        <label>Select an Appointment Date</label>
                        
                        <VueDatePicker
                        v-model="apptDate"
                        :enable-time-picker="false"
                        :clearable="true"
                        placeholder="Select an Appointment Date"
                        :close-on-auto-apply="true"
                        :show-now-button="true"

                        ></VueDatePicker>
                    </div>
                
                    <v-textarea
                        v-model="specialInstructions" 
                        label="Special Instructions" 
                        variant="outlined"
                        placeholder="Please indicate the type of services you want for your pet"
                    />

                    <div class="flex flex-col items-center justify-between w-full">
                        <ButtonNew text="Make Appointment" class="default" @click="createAppt"/>

                        <div class="mt-4 flex flex-row items-center justify-between gap-2 hover:cursor-pointer">
                            <ArrowLeftIcon class="h-4 w-4"/>
                            <label @click="goToPetProfile"
                            class="font-light text-sm text-black hover:cursor-pointer hover:underline">
                            Back
                        </label>
                    </div>
                    </div>
            </div>


        </div>

    <Footer/>
</template>