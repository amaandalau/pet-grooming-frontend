<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue'
import ButtonNew from '../components/ButtonNew.vue'
import { useRouter } from 'vue-router';
import { useAuthStores } from '../stores/auth';
import { onMounted, reactive } from 'vue';

const router = useRouter()
const authStore = useAuthStores()

const goToSignUp = () => {
    router.push('/signup')
}

const user = reactive({
    isLoggedIn: false
})

const checkUserLoggedIn = async () => {
    const currentUser = await authStore.getCurrentUser()
    user.isLoggedIn = !!currentUser
}

onMounted(() => {
    checkUserLoggedIn()
})

</script>

<template>
    <Navbar/>

    <div class="min-w-screen min-h-screen">
        <div class="mx-auto my-4 text-center">
            <label class="font-bold text-3xl">ABOUT</label>
        </div>

        <div class="m-48 flex items-center justify-center text-center">
            <p class="font-light text-lg">
                Experience convenience and peace of mind with our Pet Grooming Appointment Booking System. Find top-notch groomers, book appointments with ease, and receive friendly reminders. Flexible rescheduling options and valuable feedback ensure a seamless grooming experience. Join us today and simplify your pet's grooming routine.
            </p>
        </div>

        <div class="mx-48" v-if="!user.isLoggedIn">
            <ButtonNew text="Sign Up Now" @click="goToSignUp"/>
        </div>

    </div>

    <Footer/>
</template>