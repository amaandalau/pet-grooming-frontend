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
      <div class="text-center text-2xl font-semibold">Change Password</div>
      <div class="text-center text-sm font-light mb-8">Change your password at any time</div>

  
        <v-text-field
        label="Current Password"
          density="comfortable"
          placeholder="Enter your current password"
          variant="outlined"
          hint="Enter your current password"
        ></v-text-field>
  
  
        <v-text-field
        class="mt-4"
        label="New Password"
        hint="Enter your new password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="comfortable"
          placeholder="Enter your new password"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-text-field
        class="mt-4"
        label="Confirm New Password"
        hint="Re-enter your new password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="comfortable"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-btn
          block
          class="my-8 bg-black text-white"
          size="large"
          variant="outlined"
        >
          Save
        </v-btn>
      </v-card>
    </div>
  </template>
  