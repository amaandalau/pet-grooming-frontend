<script setup>
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";

const visible = ref(false);

</script>

<template>
  <Navbar />
  <div class="mt-8">
    <v-card class="mx-auto pa-12 pb-8" elevation="0" max-width="448" rounded="lg">
      <div class="text-center text-2xl font-semibold">Sign Up</div>
      <div class="text-center text-sm font-light mb-8">Let's get started</div>

      <v-text-field
        label="Name"
        density="comfortable"
        placeholder="Enter your name"
        variant="outlined"
        hint="Enter your name"
        class="mb-4"
      ></v-text-field>

      <v-text-field
        label="Email"
        density="comfortable"
        placeholder="Enter your email"
        variant="outlined"
        hint="Enter your email"
        class="mb-4"
      ></v-text-field>


      <v-text-field
        label="Password"
        hint="Enter your password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="comfortable"
        placeholder="Enter your password"
        variant="outlined"
        @click:append-inner="visible = !visible"
        class="mb-4"
      ></v-text-field>

      <v-select
        clearable
        label="Choose A Role"
        :items="['Pet Owner', 'Pet Groomer']"
        variant="outlined"
        density="comfortable"
      ></v-select>

      <v-btn block class="my-8 bg-black text-white" size="large" variant="outlined"> Sign Up </v-btn>

      <v-card-text class="text-center text-slate-700 font-light">
        Have an account?
        <a class="text-black hover:underline" href="/signup" rel="noopener noreferrer">
          Log in
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
