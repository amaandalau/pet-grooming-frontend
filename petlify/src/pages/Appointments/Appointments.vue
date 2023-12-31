<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import EmptyState from '../../components/EmptyState.vue'

import { onMounted, ref } from 'vue'
import { useUserStores } from '../../stores/users';
import { useApptStores } from '../../stores/appointments';
import { usePetStores } from '../../stores/pets';
import { useAuthStores } from '../../stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStores()
const userStore = useUserStores()
const apptStore = useApptStores()
const petStore = usePetStores()

const apptList = ref([])

const apptDate = ref(null)
const apptStatus = ref(null)
const ownerID = ref(null)
const petID = ref(null)

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

const getAllAppt = async () => {
  const currentUser = await authStore.getCurrentUser()
  const userID = currentUser.id

  const appointments = await apptStore.getAllAppt()
  apptList.value = appointments.filter((appointment) => appointment.groomerID === userID)
  apptList.value.sort((a, b) => new Date(b.apptDate) - new Date(a.apptDate))

  for(const appointment of apptList.value) {
    const pet = await petStore.getPetByID(appointment.petID)
    const owner = await userStore.getUserByID(appointment.ownerID)

    appointment.petName = pet.name
    appointment.ownerName = owner.name
  }

  console.log('Appt List (Filtered)', apptList.value)

}

const goToApptDetails = (apptID) => {
  router.push(`/apptDetails/${apptID}`)
}

const goToEditAppt = (apptID) => {
  router.push(`/editAppt/${apptID}`)
}


onMounted( async () => {
  await getAllAppt()
})

</script>

<template>
  <Navbar/>

  <div class="min-h-screen m-4">

    <div class="my-2 bg-white text-center">
        <label class="mx-6 text-2xl font-semibold">Upcoming Appointments</label>
        <p class="font-light text-sm my-2">This table is sorted based on the latest appointment dates</p>
    </div>

<div class="overflow-x-auto sm:rounded-lg my-8">
    <table v-if="apptList.length > 0" class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-white uppercase bg-slate-900">
            <tr>
                <th scope="col" class="px-6 py-3">Appointment Date</th>

                <th scope="col" class="px-6 py-3">Pet Name</th>

                <th scope="col" class="px-6 py-3">Pet's Owner</th>

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
                  {{ appointment.petName }}
              </td>

              <td class="px-6 py-4">
                  {{ appointment.ownerName }}
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

    <div v-else>
      <EmptyState :text="`No appointments yet`"/>
    </div>
</div>


  </div>

  
  <Footer/>
</template>