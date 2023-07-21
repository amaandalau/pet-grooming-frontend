<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue'

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStores } from '../stores/auth';
import { useUserStores } from '../stores/users';

const visible = ref(false)
const router = useRouter()
const authStore = useAuthStores()
const userStore = useUserStores()

const email = ref('')
const password = ref('')

const login = async () => {
  const emailValue = email.value
  const passwordValue = password.value

  if(!emailValue || !passwordValue) return

  const userID = await authStore.login(emailValue, passwordValue)
  console.log('User logged in 1')
  console.log('Login ID Check - ', userID)

  if (userID) {
    const user = await userStore.getUserByID(userID)
    const userRole = user.role

    if(userRole === 'owner') {
      router.push(`/${userID}/pets`)
    } else if (userRole === 'groomer') {
      router.push(`${userID}/appointments`)
    }
  }
}

</script>

<template>
    <Navbar/>

    <div class="mt-8 min-h-screen">
  
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="0"
        max-width="448"
        rounded="lg"
      >
      <div class="text-center text-2xl font-semibold">Login</div>
      <div class="text-center text-sm font-light mb-8">Welcome back!</div>

  
        <v-text-field
        v-model="email"
        label="Email"
          density="comfortable"
          placeholder="Enter your email"
          variant="outlined"
          hint="Enter your email"
          class="mb-4"
        ></v-text-field>
  
        <!-- <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div> -->
  
        <v-text-field
        v-model="password"
        label="Password"
        hint="Enter your password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="comfortable"
          placeholder="Enter your password"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <a
            class="text-caption text-slate-800 font-light hover:underline"
            href="/forgotPassword"
            rel="noopener noreferrer"
          >
            Forgot login password?</a>
  
  
        <v-btn
          block
          class="my-8 bg-black text-white"
          size="large"
          variant="outlined"
          @click="() => { if (email && password) login() }"
        >
          Log In
        </v-btn>
  
        <v-card-text class="text-center text-slate-700 font-light">
            Don't have an account?
          <a
            class="text-black hover:underline"
            href="/signup"
            rel="noopener noreferrer"
          >
            Sign up now
          </a>
        </v-card-text>
      </v-card>
    </div>

    <Footer/>
  </template>
  