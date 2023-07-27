<script setup>
import { ref, onMounted, computed, provide, inject } from 'vue';
import ButtonNew from '../components/ButtonNew.vue'
import { useUserStores } from '../stores/users';
import { useAuthStores } from '../stores/auth';
import { useRoute, useRouter } from 'vue-router';

import { UserCircleIcon } from '@heroicons/vue/24/outline'

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const router = useRouter()
const authStore = useAuthStores()
const userStore = useUserStores()

const name = ref(null)
const email = ref(null)

const goToProfile = async () => {
  const currentUser = await authStore.getCurrentUser()
  const userID = currentUser.id

  router.push(`/profile/${userID}`)

}

const logout = async () => {
  await authStore.logout()
  router.push('/')
}

onMounted(async () => {
  const currentUser = await authStore.getCurrentUser()
  const userID = currentUser.id

  const user = await userStore.getUserByID(userID)

  if(user) {
    name.value = user.name
    email.value = user.email
  }
})


</script>

<template>
    <div class="relative" @click="toggleDropdown">
     <div class="flex flex-row items-center px-2 rounded-md hover:cursor-pointer hover:bg-slate-100">
      <UserCircleIcon class="h-7 w-7"/>
      <label class="text-center font-semibold px-4 py-2">{{ name }}</label>
     </div>
      
      <!-- <v-btn class="border-2 bg-black text-center text-white font-bold px-4 py-2 ">{{ name }}</v-btn> -->

      <div v-show="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
        <div class="px-4 py-2 text-gray-800">{{ name }}</div>
        <div class="px-4 py-2 text-gray-800 text-sm font-light">{{ email }}</div>

        <hr>
        
        <label @click="goToProfile" 
          class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:cursor-pointer">
            My Profile
        </label>

        <label class="block px-4 py-2 text-gray-800">Settings</label>
        
        <!-- <label @click="$emit('logout')" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:cursor-pointer"> Logout </label> -->
        <label @click="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-200 hover:cursor-pointer"> Logout </label>
      </div>
    </div>
  </template>