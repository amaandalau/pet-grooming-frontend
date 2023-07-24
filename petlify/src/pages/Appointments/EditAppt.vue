<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PetApptHeader from '@/components/PetApptHeader.vue'
import Input from '@/components/Input.vue'
import ButtonNew from '@/components/ButtonNew.vue'
import SelectDropdown from '@/components/SelectDropdown.vue'
import { onMounted, ref } from 'vue'
import { usePetStores } from '../../stores/pets'
import { useApptStores } from '../../stores/appointments'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStores } from '../../stores/auth'
import { useUserStores } from '../../stores/users'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStores()
const userStore = useUserStores()
const petStore = usePetStores()
const apptStore = useApptStores()

// PET
const petName = ref(null)
const petDOB = ref(null)
const petSpecies = ref(null)
const petBreed = ref(null)
const petColour = ref(null)
const petWeight = ref(null)

const apptID = route.params.apptID

const getPetData = async () => {
    const appt = await apptStore.getApptByID(apptID)

    const petID = appt.petID
    const pet = await petStore.getPetByID(petID)

    petName.value = pet.name
    petDOB.value = pet.dateOfBirth
    petSpecies.value = pet.species
    petBreed.value = pet.breed
    petColour.value = pet.color
    petWeight.value = pet.weightInKG
}

// APPT 
const statusList = ref(['confirmed', 'in-progress', 'completed'])
const status = ref(null)
const selectedStatus = ref(null)
const selectedDate = ref(null)
const specialInstructions = ref(null)

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.toLocaleString('en-GB', { day: '2-digit'})
  const month = date.toLocaleString('en-GB', { month: 'long'})
  const year = date.toLocaleString('en-GB', { year: 'numeric'})

  return `${day} ${month} ${year}`
}

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

const getApptData = async () => {
    const appt = await apptStore.getApptByID(apptID)

    selectedDate.value = formatDate(appt.apptDate)
    specialInstructions.value = appt.specialInstructions

    const apptStatus = formatStatus(appt.status)

    if(apptStatus) {
        status.value = apptStatus
        console.log('Status:', status.value)

        selectedStatus.value = status
    }
    
}

const editAppt = async () => {

    const appt = await apptStore.getApptByID(apptID)
    const selectedDateValue = appt.apptDate
    const specialInstructions = appt.specialInstructions
    const selectedStatus = status.value
    const ownerID = appt.ownerID
    const petID = appt.petID
    
    const currentUser = await authStore.getCurrentUser()
    const userID = currentUser.id
    const groomerID = userID
    const timeslotID = 6


    await apptStore.updateAppt(apptID,selectedDateValue, specialInstructions, selectedStatus, ownerID, petID, groomerID, timeslotID)
    console.log('Appt Updated')

    router.push(`/apptDetails/${apptID}`)
    
}

onMounted(() => {
    getPetData()
    getApptData()
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
        />
        
            <div class="mx-10 my-6 flex flex-col gap-8">
                <div class="flex flex-row flex-wrap gap-8 items-center">

                    <SelectDropdown 
                        label="Status" 
                        :options="statusList"
                        v-model="status"
                    />

                    <Input label="Appointment Date" :value="selectedDate" :disabled="true" />
                </div>

                <v-textarea 
                    v-model="specialInstructions" 
                    label="Special Instructions" 
                    variant="outlined"
                    :disabled="true"
                >
                </v-textarea>

                <div class="flex flex-row items-center justify-between gap-8">

                    <!-- <div class="w-full" v-if="apptStatus === 'Confirmed'">
                        <ButtonNew 
                        text="Cancel"
                        elevation="0"
                        class="cancel"
                        @click="cancelAppt"
                        />
                    </div> -->

                    <div class="w-full">
                        <ButtonNew 
                            text="Save Appointment" 
                            class="default"
                            @click="editAppt"
                        />
                    </div>

                    <!-- <div class="w-full" v-else-if="apptStatus === 'Cancelled'">
                        <ButtonNew 
                            text="Reschedule Appointment"
                            elevation="0"
                            class="default"
                            @click="reschedAppt"
                        />
                    </div> -->

                </div>

                <div class="block m-4 text-center">
                    <label class="font-light text-red-600 hover:underline hover:cursor-pointer">Delete Appointment</label>
                </div>
            </div>

    </div>

    <Footer/>
</template>