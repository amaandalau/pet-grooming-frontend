<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import PetApptHeader from "@/components/PetApptHeader.vue";
import Input from "@/components/Input.vue";
import InputNew from '@/components/InputNew.vue'
import ButtonNew from '@/components/ButtonNew.vue'
import SelectDropdown from "../../components/SelectDropdown.vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline"

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePetStores } from "../../stores/pets";
import { useApptStores } from "@/stores/appointments";
import { useUserStores } from "../../stores/users";

const router = useRouter()
const route = useRoute()
const userStore = useUserStores()
const petStore = usePetStores()
const apptStore = useApptStores()

const petName = ref(null);
const petDOB = ref(null);
const petSpecies = ref(null);
const petBreed = ref(null);
const petColour = ref(null);
const petWeight = ref(null);
const petOwner = ref(null)

const selectedGroomer = ref(null);
const apptStatus = ref(null);
const selectedDate = ref(null)
const specialInstructions = ref(null)

const statusList = ref(['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'])

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.toLocaleString('en-GB', { day: '2-digit'})
  const month = date.toLocaleString('en-GB', { month: 'long'})
  const year = date.toLocaleString('en-GB', { year: 'numeric'})

  return `${day} ${month} ${year}`
}

const toTitleCase = (str) => {
    return str
        .toLowerCase()
        .replace(/\b\w/g, (match) => match.toUpperCase())
}

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
    
    apptStatus.value = toTitleCase(appt.status)
    selectedDate.value = formatDate(appt.apptDate)
    specialInstructions.value = appt.specialInstructions
}

const goToEditAppt = async () => {
    router.push(`/${route.params.petID}/editPetAppt/${route.params.apptID}`)
}

const goToPetProfile = () => {
    router.push(`/petProfile/${route.params.petID}`)
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
      sub-header="Appointment Details"
      :pet-name="petName"
      :pet-bday="formatDate(petDOB)"
      :pet-species="petSpecies"
      :pet-breed="petBreed"
      :pet-colour="petColour"
      :pet-weight="petWeight"
      :pet-owner="petOwner"
    />

    <div>


      <div class="mx-10 my-6 flex flex-col gap-8">
        <div class="flex flex-row flex-wrap gap-8 items-center">
            
            <Input 
                label="Selected Groomer"
                :value="selectedGroomer"
                :disabled="true"
            />

            <Input
                label="Appointment Status"
                :value="apptStatus"
                :disabled="true"
            />

            <Input 
                label="Appointment Date" 
                :value="selectedDate" 
                :disabled="true" 
            />
        </div>

        <v-textarea 
            v-model="specialInstructions" 
            label="Special Instructions" 
            variant="outlined"
            :disabled="true"
        >
        </v-textarea>

        <div class="flex flex-col w-full items-center justify-between gap-4">
            <ButtonNew text="Edit Appointment" @click="goToEditAppt" class="default"/>

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
  </div>

  <Footer />
</template>
