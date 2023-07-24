<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import ButtonNew from '@/components/ButtonNew.vue'

import { onMounted, ref } from 'vue'
import { useUserStores } from '../../stores/users';
import { useApptStores } from '../../stores/appointments';
import { usePetStores } from '../../stores/pets';
import { useAuthStores } from '../../stores/auth';

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
  const month = date.toLocaleString('en-GB', { month: 'short'})
  const year = date.toLocaleString('en-GB', { year: 'numeric'})

  return `${day}-${month}-${year}`
}

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

const getAllAppt = async () => {
  const currentUser = await authStore.getCurrentUser()
  const userID = currentUser.id

  const appointments = await apptStore.getAllAppt()
  apptList.value = appointments.filter((appointment) => appointment.groomerID === userID)

  for(const appointment of apptList.value) {
    const pet = await petStore.getPetByID(appointment.petID)
    const owner = await userStore.getUserByID(appointment.ownerID)

    appointment.petName = pet.name
    appointment.ownerName = owner.name
  }

  console.log('Appt List (Filtered)', apptList.value)

  apptList.value.sort((a, b) => new Date(b.apptDate) - new Date(a.apptDate))

}

onMounted(() => {
  getAllAppt()
})

</script>

<template>
  <Navbar/>

  <div class="min-h-screen m-4">

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ formatDate(appointment.apptDate) }}
                </th>
                <td class="px-6 py-4">
                    {{ appointment.petName }}
                </td>
                <td class="px-6 py-4">
                    {{ appointment.ownerName }}
                </td>
                <td class="px-6 py-4">
                    {{ formatStatus(appointment.status) }}
                </td>
                <td class="px-6 py-4 text-left">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>


  </div>

  
  <Footer/>
</template>