<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import PetApptHeader from '@/components/PetApptHeader.vue';
import SelectDropdown from '@/components/SelectDropdown.vue';
import ButtonNew from '@/components/ButtonNew.vue'
import Input from '@/components/Input.vue'
import { useApptStores } from '../../stores/appointments';
import { usePetStores } from '../../stores/pets';
import { useUserStores } from '../../stores/users';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

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
const petOwner = ref(null)

const getPetData = async () => {
    const apptID = route.params.apptID
    const appt = await apptStore.getApptByID(apptID)
    const petID = appt.petID
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

// APPT
const statusList = ref(['confirmed', 'in-progress', 'completed'])
const selectedDate = ref(null)
const apptStatus = ref(null)
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
    const apptID = route.params.apptID
    const appt = await apptStore.getApptByID(apptID)

    console.log('Appt:', appt)

    apptStatus.value = formatStatus(appt.status)
    selectedDate.value = formatDate(appt.apptDate)
    specialInstructions.value = appt.specialInstructions
}

const goToEditAppt = () => {
    router.push(`/editAppt/${route.params.apptID}`)
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
            sub-header="Appointment Details"
            :pet-name="petName"
            :pet-bday="petDOB"
            :pet-species="petSpecies"
            :pet-breed="petBreed"
            :pet-colour="petColour"
            :pet-weight="petWeight"
            :pet-owner="petOwner"
        />


      <!-- <div class="block text-center m-4" v-if="hasUpcomingAppt()">
        <label class="font-semibold text-orange-400">
            {{ petName }} has an upcomming appointment on {{ selectedDate }}!
        </label>
      </div> -->

        
            <div class="mx-10 my-6 flex flex-col gap-8">
                <div class="flex flex-row flex-wrap gap-8 items-center">

                    <!-- <SelectDropdown 
                        label="Status" 
                        :options="statusList"
                        v-model="statusList"
                    /> -->

                    <Input label="Appointment Status" :value="apptStatus" :disabled="true"/>

                    <Input label="Appointment Date" :value="selectedDate" :disabled="true" />
                </div>

                <v-textarea
                    v-model="specialInstructions" 
                    label="Special Instructions" 
                    variant="outlined"
                    :disabled="true"
                >
                </v-textarea>


                <div class="w-full">
                        <ButtonNew 
                            text="Edit Appointment" 
                            class="default"
                            @click="goToEditAppt"
                        />
                    </div>
            </div>
    </div>

    <Footer/>
</template>