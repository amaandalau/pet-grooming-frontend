<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import PetApptHeader from "@/components/PetApptHeader.vue";
import Input from "@/components/Input.vue";
import InputNew from '@/components/InputNew.vue'
import ButtonNew from '@/components/ButtonNew.vue'
import SelectDropdown from "../../components/SelectDropdown.vue";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePetStores } from "../../stores/pets";
import { useApptStores } from "@/stores/appointments";
import { useUserStores } from "../../stores/users";

const router = useRouter()
const route = useRoute()
const userStore = useUserStores()
const petStore = usePetStores()
const apptStore = useApptStores();

const petName = ref(null);
const petDOB = ref(null);
const petSpecies = ref(null);
const petBreed = ref(null);
const petColour = ref(null);
const petWeight = ref(null);

const selectedGroomer = ref(null);
const apptStatus = ref(null);
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
    
    const pet = await petStore.getPetByID(petID)

    petName.value = pet.name
    petDOB.value = pet.dateOfBirth
    petSpecies.value = pet.species
    petBreed.value = pet.breed
    petWeight.value = pet.weightInKG
}

const getApptDetails = async () => {
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

const goToEditAppt = async () => {
    router.push(`/${route.params.petID}/editPetAppt/${route.params.apptID}`)
}

onMounted(() => {
    getPetData()
    getGroomerList()
    getApptDetails()
})
</script>

<template>
  <Navbar />

  <div class="min-h-screen">
    <PetApptHeader
      :header="`${petName}'s Appointment Details`"
      :pet-name="petName"
      :pet-bday="petDOB"
      :pet-species="petSpecies"
      :pet-breed="petBreed"
      :pet-colour="petColour"
      :pet-weight="petWeight"
    />

    <div>
      <div class="py-2 bg-white drop-shadow-md rounded-lg">
        <label class="mx-6 text-xl font-semibold">Appointment Details</label>
      </div>

      <div class="mx-10 my-6 flex flex-col gap-8">
        <div class="flex flex-row flex-wrap gap-8 items-center">
            <SelectDropdown
                label="Selected Groomer"
                :value="selectedGroomer"
                :options="groomerList"

            />

            <SelectDropdown
                label="Appointment Status"
                :value="apptStatus"
                :options="apptStatusList"

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

        <ButtonNew text="Edit Appointment" @click="goToEditAppt" />
      </div>
    </div>
  </div>

  <Footer />
</template>
