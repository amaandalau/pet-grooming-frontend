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
import { ref, onMounted, onBeforeMount } from 'vue';
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

const apptDate = ref()
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

const groomerList = ref([])
const groomerID = ref(null)
const groomerName = ref(null)
const selectedGroomer = ref(null)

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
    console.log('Selected Date', selectedDate.value)
    specialInstructions.value = appt.specialInstructions

        
}

const editAppt = async () => {

    const pet = await petStore.getPetByID(route.params.petID)
    const ownerID = pet.ownerID
    const petID = parseInt(route.params.petID)

    const apptID = route.params.apptID
    const appt = await apptStore.getApptByID(apptID)

    const apptDateValue = apptDate.value
    const specialInstructionsValue = specialInstructions.value
    const status = appt.status
    const timeslotID = 6 // Just using id from dummy data 

    const selectedGroomer = groomerList.value.find(groomer => groomer.name === groomerName.value)
    const groomerIDValue = selectedGroomer ? selectedGroomer.id : null

    if(status === 'confirmed' || status === 'in-progress' || status === 'completed') {
        console.log('Cannot edit appointment')
    } else {
        await apptStore.updateAppt(apptID, apptDateValue, specialInstructionsValue, status, ownerID, petID, groomerIDValue, timeslotID)
    }

    console.log('Appt Edited')
    router.push(`/${petID}/petApptDetails/${apptID}`)

}

const cancelAppt = async () => {
    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id
    
    const apptID = route.params.apptID
    const petID = route.params.petID

    const appt = await apptStore.getApptByID(apptID)

    const selectedApptDate = apptDate.value
    const specialInstructionsValue = specialInstructions.value
    const updatedStatus = 'cancelled'
    const ownerID = userID
    
    const selectedGroomer = groomerList.value.find(groomer => groomer.name === groomerName.value)
    const groomerIDValue = selectedGroomer ? selectedGroomer.id : null

    const timeslotID = 6 // Just to bypass updating appt

    await apptStore.updateAppt(apptID, selectedApptDate, specialInstructionsValue, updatedStatus, ownerID, petID, groomerIDValue, timeslotID)
    console.log('Appointment Cancelled')
    
    router.push(`/${petID}/petApptDetails/${apptID}`)
}

const reschedAppt = async () => {
    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id
    
    const apptID = route.params.apptID
    const petID = route.params.petID

    const appt = await apptStore.getApptByID(apptID)

    let selectedApptDate = apptDate.value
    let specialInstructionsValue = specialInstructions.value
    let groomerIDValue = groomerID.value

    const updatedStatus = 'pending'
    const ownerID = userID
    const timeslotID = 6

    if(appt.status === 'cancelled') {
        selectedApptDate = apptDate.value
        specialInstructionsValue = specialInstructions.value

        const selectedGroomer = groomerList.value.find(groomer => groomer.name === groomerName.value)
        groomerIDValue = selectedGroomer ? selectedGroomer.id : null
    }

    await apptStore.updateAppt(apptID, selectedApptDate, specialInstructionsValue, updatedStatus, ownerID, petID, groomerIDValue, timeslotID)
    console.log('Appointment Rescheduled')
    router.push(`/${petID}/petApptDetails/${apptID}`)
}

const upcomingAppt = ref([])
const apptList = ref(null)

const hasUpcomingAppt = async () => {
    const today = new Date()
    const petID = route.params.petID

    apptList.value = await apptStore.getAllAppt()
    console.log('Appt List:', apptList.value)

    return upcomingAppt.value.some(appt => {
        return appt.petID === petID && new Date(appt.apptDate) > today
    })

//     upcomingAppt.value = apptList.value.find(appt => {
//         return appt.petID === petID && new Date(appt.apptDate) > today && appt.status
//     })

//     return upcomingAppt.value 
}

onBeforeMount(async () => {
    await getGroomerList()
})

onMounted(() => {
    getPetData()
    getApptData()
    // getGroomerList()
    hasUpcomingAppt()
})

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


      <!-- <div class="block text-center m-4" v-if="hasUpcomingAppt()">
        <label class="font-semibold text-orange-400">
            {{ petName }} has an upcomming appointment on {{ selectedDate }}!
        </label>
      </div> -->

        
            <div class="mx-10 my-6 flex flex-col gap-8">
                <div class="flex flex-row flex-wrap gap-8 items-center">

                    <SelectDropdown 
                        label="Select a Groomer" 
                        :options="groomerList.map(groomer => groomer.name)"
                        v-model="groomerName"
                        :modelValue="groomerName"
                        @update:value="groomerName"
                    />

                    <Input
                        label="Status"
                        :value="apptStatus"
                        :disabled="true"
                    />

                    <Input label="Appointment Date" :value="selectedDate" :disabled="true" />
                </div>

                <div class="flex flex-col gap-2">
                        <label>Select an Appointment Date</label>
                        
                        <VueDatePicker
                        v-model="apptDate"
                        :enable-time-picker="false"
                        :clearable="true"
                        :close-on-auto-apply="true"
                        :show-now-button="true"
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

                    <div class="w-full" v-if="apptStatus === 'Confirmed'">
                        <ButtonNew 
                        text="Cancel"
                        elevation="0"
                        class="cancel"
                        @click="cancelAppt"
                        />
                    </div>

                    <div class="w-full" v-else-if="apptStatus === 'Pending'">
                        <ButtonNew 
                            text="Save Appointment" 
                            class="default"
                            @click="editAppt"
                        />
                    </div>

                    <div class="w-full" v-else-if="apptStatus === 'Cancelled'">
                        <ButtonNew 
                            text="Reschedule Appointment"
                            elevation="0"
                            class="default"
                            @click="reschedAppt"
                        />
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