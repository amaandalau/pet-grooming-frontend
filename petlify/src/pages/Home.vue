<script setup>
import ButtonNew from '../components/ButtonNew.vue';
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import { computed } from 'vue';
import { useAuthStores } from '../stores/auth';

const authStore = useAuthStores()

// Computed property to determine the home route based on role & login status
const homeRoute = computed(() => {
    const currentUser = authStore.getCurrentUser
    const isLoggedIn = !currentUser

    if(isLoggedIn) {
        if(currentUser.value.role === 'owner') {
            // Return the route for displaying upcoming appointments for owners
            return '/upcoming-appts'
        } else if (currentUser.value.role === 'groomer') {
            // Return the route for displaying appointments for groomers
            return '/appointments'
        }
    }

    // Default home route
    return '/'
})

</script>

<template>
    <Navbar :user-logged-in="isLoggedIn"/>

    <div class="flex flex-col justify-center items-center gap-10 min-h-screen max-h-screen">
        
        <template v-if="homeRoute !== '/upcoming-appts' && homeRoute!== '/appointments'">
            <!-- Content for default home page -->

            <div class="flex flex-col justify-center items-center gap-2">
                <label class="text-6xl font-extrabold">
                    Beautify A Pet
                </label>
                <label class="text-md font-light">Groom your pet OR Groom a pet, your choice</label>
            </div>
            
            <div>
                <router-link to="/signup">
                    <ButtonNew text="Get Started" rounded="sm" class="default"/>
                </router-link>
                <div class="mt-4">
                    <!-- <label class="font-light text-sm">
                        Already have an account? 
                        <a class="hover:underline hover:cursor-pointer" href="/login">Log in</a>
                    </label>  -->
                    <v-card-text class="text-center text-slate-700 font-light">
        Have an account?
        <a class="text-black hover:underline" href="/login" rel="noopener noreferrer">
          Log in
        </a>
      </v-card-text>
                </div>
            </div>
        </template>

        <!-- Content for owners -->
        <template v-if="homeRoute === '/upcoming-appt'">
            Test - Logged In as owner
        </template>

        <!-- Content for groomers -->
        <template v-if="homeRoute === '/appointments'">
            Test - logged in as groomer
        </template>
            

    </div>

    <Footer/>
</template>
