<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Label from '../../components/Label.vue'
import ButtonNew from "@/components/ButtonNew.vue";
import DefaultPetAvatar from '../../components/DefaultPetAvatar.vue'
import PetApptHeader from '../../components/PetApptHeader.vue'

import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePetStores } from "../../stores/pets.js";
import { useAuthStores } from "../../stores/auth";
import { useUserStores } from "../../stores/users";
import { useApptStores } from "../../stores/appointments";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStores();
const userStore = useUserStores()
const petStore = usePetStores();
const apptStore = useApptStores()

const petName = ref(null);
const petDOB = ref(null);
const petSpecies = ref(null);
const petBreed = ref(null);
const petColour = ref(null);
const petWeight = ref(null);
const petOwner = ref(null)

const getPetData = async () => {

    const petID = route.params.id
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


const formattedDOB = computed(() => {
  if (petDOB.value) {
    const date = new Date(petDOB.value);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  }

  return "";
});
}

const apptList = ref([])

const getApptByPetID = async () => {
    const petID = route.params.id
    
    const appointments = await apptStore.getApptByPetID(petID)
    apptList.value = appointments
    apptList.value.sort((a, b) => new Date(b.apptDate) - new Date(a.apptDate))

    for(const appointment of apptList.value) {
        const groomer = await userStore.getUserByID(appointment.groomerID)

        appointment.groomerName = groomer.name
    }

    console.log('Appt History', apptList.value)

}

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

const statusColor = (status) => {
  switch (status) {
    case 'pending': 
      return 'text-yellow-500'
    
    case 'confirmed':
      return 'text-blue-500'

    case 'in-progress':
      return 'text-purple-500'

    case 'completed':
      return 'text-green-500'
    
    case 'cancelled':
      return 'text-red-500'
    
    default:
      return 'text-black'
  }
}

onMounted( async () => {
  await getPetData()
  await getApptByPetID()

});

const goToEditPet = () => {
  router.push(`/editPet/${route.params.id}`);
};

const goToMakeAppt = () => {
  router.push(`/${route.params.id}/createPetAppt`);
};

const goToApptDetails = (apptID) => {
    router.push(`/${route.params.id}/petApptDetails/${apptID}`)

}

const goToEditAppt = (apptID) => {
    router.push(`/${route.params.id}/editPetAppt/${apptID}`)
}

</script>

<template>
  <Navbar />

  <div class="min-h-screen h-auto mb-20">

    <div class="ml-2 mr-6 mt-2 flex flex-row items-center justify-between text-right">
        <label class="mx-6 text-xl font-semibold">{{ petName }}'s Profile</label>
        <label class="font-light text-xs hover:cursor-pointer hover:underline" @click="goToEditPet">Edit Pet Profile</label>
    </div>
    <!-- Pet Profile -->
    <PetApptHeader
        sub-header="Appointment History"
        :pet-name="petName"
        :pet-bday="formatDate(petDOB)"
        :pet-species="petSpecies"
        :pet-breed="petBreed"
        :pet-colour="petColour"
        :pet-weight="petWeight"
        :pet-owner="petOwner"
    />

    <!-- Appt Table -->
    <div class="mt-4 block text-right">
        <button @click="goToMakeAppt"
            class="mx-8 px-4 py-2 bg-slate-950 rounded-md text-center text-sm text-white hover:cursor-pointer">
            Make a new appointment
        </button>
    </div>

    <div class="overflow-x-auto sm:rounded-lg my-6 mx-10">
        
        <p class="m-1 italic font-light text-xs">Please contact your groomer to arrange type of services and your timeslot</p>
        <p class="m-1 italic font-light text-xs">*Newer appointment dates will be shown first</p>
    
        <table class="w-full text-sm text-left text-gray-500">
        
            <thead class="text-xs text-white uppercase bg-slate-900">
            <tr>
                <th scope="col" class="px-6 py-3">Appointment Date</th>

                <th scope="col" class="px-6 py-3">Groomer</th>

                <th scope="col" class="px-6 py-3">Status</th>

                <th scope="col" class="px-6 py-3">
                  Actions
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>

        <tbody>
            <tr 
              v-for="(appointment, index) in apptList"
              :key="index" 
              class="odd:bg-slate-50 even:bg-white border-b hover:bg-gray-50 hover:cursor-pointer"
              @click="goToApptDetails(appointment.id)"
            >
                
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {{ formatDate(appointment.apptDate) }}
              </th>

              <td class="px-6 py-4">
                <!-- Change to groomer's name -->
                  {{ appointment.groomerName }}
              </td>

              <td class="px-6 py-4 font-semibold" 
              :class="statusColor(appointment.status)">
                  {{ formatStatus(appointment.status) }}
              </td>

              <td class="px-6 py-4 text-left">
                  <a @click.stop="goToEditAppt(appointment.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer">Edit</a>
              </td>
            </tr>
            
        </tbody>
    </table>
</div>
  </div>
  <Footer />
</template>
