<script setup>
import { ref } from 'vue';
import Navbar from '../components/Navbar.vue';

const visible = ref(false)
</script>

<template>
    <Navbar/>
    <div class="mt-8">
  
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="0"
        max-width="448"
        rounded="lg"
      >
      <div class="text-center text-2xl font-semibold">Login</div>
      <div class="text-center text-sm font-light mb-8">Welcome back!</div>

  
        <v-text-field
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
        >
          Log In
        </v-btn>
  
        <v-card-text class="text-center">
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
  </template>
  