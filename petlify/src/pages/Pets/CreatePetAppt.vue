<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import ButtonNew from '@/components/ButtonNew.vue'
import SelectDropdown from '../../components/SelectDropdown.vue';
import PetApptHeader from '../../components/PetApptHeader.vue';

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

const getPetData = async () => {

    const petID = route.params.petID
    console.log('Get Pet Data PetID', petID)

    const pet = await petStore.getPetByID(petID)
    console.log('Pet Data', pet)

    petName.value = pet.name
    petDOB.value = pet.dateOfBirth
    petSpecies.value = pet.species
    petBreed.value = pet.breed
    petColour.value = pet.color
    petWeight.value = pet.weightInKG

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

    router.push(`/${ownerID}/pets`)
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
                        show-now-button=""
                        ></VueDatePicker>
                    </div>
                
                    <v-textarea
                        v-model="specialInstructions" 
                        label="Special Instructions" 
                        variant="outlined">
                    </v-textarea>

                <ButtonNew text="Make Appointment" class="default" @click="createAppt"/>
            </div>


        </div>

    <Footer/>
</template>