<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PetApptHeader from '@/components/PetApptHeader.vue'
import Input from '@/components/Input.vue'
import ButtonNew from '@/components/ButtonNew.vue'
import SelectDropdown from '@/components/SelectDropdown.vue'
import VueDatePicker from '@vuepic//vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useApptStores } from '@/stores/appointments'
import { usePetStores } from '../../stores/pets'
import { useUserStores } from '../../stores/users'
import { useAuthStores } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStores()
const userStore = useUserStores()
const petStore = usePetStores()
const apptStore = useApptStores()

const petName = ref(null)
const petDOB = ref(null)
const petSpecies = ref(null)
const petBreed = ref(null)
const petColour = ref(null)
const petWeight = ref(null)

const selectedGroomer = ref(null)
const apptStatus = ref(null)
const selectedDate = ref(null)
const specialInstructions = ref(null)

const formatApptDate = (dateString, format) => {
    const dateObj = new Date(dateString)

    const day = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObj.getFullYear()

    const formattedDate = format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year)

    return formattedDate
}

const statusList = ref(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'])

const toTitleCase = (str) => {
    return str
        .toLowerCase()
        .replace(/\b\w/g, (match) => match.toUpperCase())
}

const apptStatusList = statusList.value.map(status => toTitleCase(status))

const groomerList = ref(null)

const getGroomerList = async () => {
    try {
        const users = await userStore.getAllUsers()

        // Filter groomers
        const groomers = users.filter(user => user.role === 'groomer')

        groomerList.value = groomers.map(groomer => groomer.name)
       
        console.log('Groomers (Filtered)', groomerList.value)

    } catch (error) {
        console.error('Failed to fetch groomers', error)
    }
}

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

const getApptData = async () => {
    
    const apptID = route.params.apptID
    console.log('Appointment ID', apptID)
    const petID = route.params.petID

    const appt = await apptStore.getApptByID(apptID)
    console.log('Appointment Data', appt)

    console.log('Pet ID:', petID, 'ApptID:', apptID, 'ApptData', appt)

    const groomerID = appt.groomerID
    console.log('Groomer ID', groomerID)

    const users = await userStore.getAllUsers()

    // Filter groomers
    const groomers = users.filter(user => user.role === 'groomer')
    console.log('Groomers', groomers)

    const groomer = groomers.find(groomer => groomer.id === groomerID)

    if (groomer) {
        const groomerName = groomer.name
        console.log('Groomer Name', groomerName)

        selectedGroomer.value = groomerName
    } else {
        console.log('Groomer Not Found')
    }

    const date = appt.apptDate
    const customFormat = 'DD-MM-YYYY'
    const formattedDate = formatApptDate(date, customFormat)
    
    apptStatus.value = toTitleCase(appt.status)
    selectedDate.value = formattedDate
    specialInstructions.value = appt.specialInstructions

        
}

const editAppt = async () => {

    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id
    
    const apptID = route.params.apptID
    const petID = route.params.petID

    const appt = await apptStore.getApptByID(apptID)

    const selectedApptDate = selectedDate.value
    const specialInstructions = specialInstructions.value
    const updatedStatus = apptStatus.value
    const ownerID = userID
    const groomerID = ''
    const timeslotID = 6 // Just to bypass updating appt

    await apptStore.updateAppt(apptID, selectedApptDate, specialInstructions, updatedStatus, ownerID, petID, groomerID, timeslotID)

}

onMounted(() => {
    getPetData()
    getApptData()
    getGroomerList()
})

const goToApptDetails = async () => {
    router.push(`/${route.params.id}/petApptDetails`)
}
</script>

<template>
    <Navbar/>

    <div class="min-h-screen">
        <PetApptHeader
            :header="`${petName}'s Appointment Details`"
            sub-header="Edit Appointment Details"
            :pet-name="petName"
            :pet-bday="petDOB"
            :pet-species="petSpecies"
            :pet-breed="petBreed"
            :pet-colour="petColour"
            :pet-weight="petWeight"
        >
        
            <div class="mx-10 my-6 flex flex-col gap-8">
                <div class="flex flex-row flex-wrap gap-8 items-center">

                    <SelectDropdown
                        label="Selected Groomer"
                        :value="selectedGroomer"
                        :options="groomerList"
                    />

                    <SelectDropdown
                        label="Appointment Status"
                        sub-label="Status"
                        :options="apptStatusList"
                        :value="apptStatus"
                    />

                    <Input label="Appointment Date" :value="selectedDate" :disabled="true" />
                </div>

                <div class="flex flex-col gap-2">
                        <label>Select an Appointment Date</label>
                        
                        <VueDatePicker
                        v-model="selectedDate"
                        :enable-time-picker="false"
                        :clearable="true"
                        :close-on-auto-apply="true"
                        :show-now-button="false"
                        width="400"
                        ></VueDatePicker>
                </div>

                <v-textarea 
                    v-model="specialInstructions" 
                    label="Special Instructions" 
                    variant="outlined"
                >
                </v-textarea>

                <div class="flex flex-row items-center justify-between gap-8">
                    <!-- <button class="mx-8 px-8 py-3 border  border-slate-900 rounded-md">Cancel</button> -->

                    <div class="w-1/2">
                        <ButtonNew text="Cancel" @click="goToApptDetails"
                        elevation="0"
                        class="cancel"
                        />
                    </div>

                    <div class="w-1/2">
                        <ButtonNew text="Save Appointment" @click="goToApptDetails" class="default"/>
                    </div>

                </div>

                <div class="block m-4 text-center">
                    <label class="font-light text-red-600 hover:underline hover:cursor-pointer">Delete Appointment</label>
                </div>
            </div>

        </PetApptHeader>
    </div>

    <Footer/>
</template>