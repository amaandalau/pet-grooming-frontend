<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'
import ButtonNew from '@/components/ButtonNew.vue'

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApptStores } from '@/stores/appointments.js'

const router = useRouter()
const store = useApptStores()

const apptDate = ref('')
const specialInstructions = ref('')
const status = ref('')
const petID = ref('')
const timeslotID = ref('')
const ownerID = ref('')
const groomerID = ref('')

const createAppt = async () => {
    const apptDateValue = apptDate.value
    const specialInstructionsValue = specialInstructions
    const statusValue = status
    const petValue = petID
    const timeslotValue = timeslotID
    const ownerValue = ownerID
    const groomerValue = groomerID

    await store.createAppt(apptDate, specialInstructions, status, petID, timeslotID, ownerID, groomerID)
    console.log('Appointment Created')

    router.push('/pets')
}

</script>

<template>
    <Navbar :user-logged-in="true"/>
    
    <div class="min-h-screen">
        <div class="py-2">
            <label class="mx-6 text-xl font-semibold">Make an Appointment</label>
        </div>

        <!-- Pet Info -->
        <div class="flex flex-row items-center justify-start">
            
            <div class="border border-black rounded-full h-20 w-20 m-8">
                <!-- Pet Avatar -->
                <img src="https://images.unsplash.com/photo-1600585594245-0eb3fe7f1474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80" alt=""
                class="object-fit h-full w-full rounded-full"
                >
            </div>

            <div class="w-1/2 border border-blue-500 flex flex-col">
                <!-- Pet Details -->
                <div class="flex flex-row items-center justify-between">
                    <label class="text-xl font-semibold">Pet Name</label>
                    <label>5 years old</label>
                </div>

                <div class="flex flex-row items-center justify-between">
                    <label>Dog</label>
                    <label>French Bulldog</label>
                </div>

                <div class="flex flex-row items-center justify-between">
                    <label>White with Black Spots</label>
                    <label>5.30 KG</label>
                </div>
            </div>
        </div>

        <!-- <hr class="m-4"> -->

        <!-- Appointment -->
        <div>
            <div class="py-2 bg-white drop-shadow-md rounded-lg">
                <label class="mx-6 text-xl font-semibold">Appointment</label>
            </div>

            <div class="m-6 flex flex-col">
                <v-select
                        v-model="groomer"
                        clearable
                        label="Select Groomer"
                        :items="['Groomer A', 'Groomer B', 'Groomer C']"
                        variant="outlined"
                        density="comfortable"
                    ></v-select>

                <div class="flex flex-row items-center justify-between">
                    
                    <!-- Services -->
                    <div class="flex flex-row flex-wrap">
                        <v-checkbox
                            v-model="selected"
                            label="Nail Clipping"
                            value="Nail Clipping"
                            color="primary"    
                        ></v-checkbox>

                        <v-checkbox
                            v-model="selected"
                            label="Bath & Spa"
                            value="Bath & Spa"
                            color="primary"    
                        ></v-checkbox>

                        <v-checkbox
                            v-model="selected"
                            label="Ear Cleaning"
                            value="Ear Cleaning"
                            color="primary"    
                        ></v-checkbox>
                    </div>
                </div>

                <div class="my-8 flex flex-row items-center justify-between gap-8">
                    <v-text-field
                        v-model="apptDate"
                        label="Appointment Date"
                        density="comfortable"
                        placeholder="Select Appointment Date"
                        variant="outlined"
                    ></v-text-field>
                    
                    <v-select
                        v-model="timeslot"
                        clearable
                        label="Select Timeslot"
                        :items="['10:00 A.M.', '02:00 P.M.', '16:30 P.M.']"
                        variant="outlined"
                        density="comfortable"
                    ></v-select>
                </div>
                
                <v-textarea label="Special Instructions" variant="outlined"></v-textarea>
                <ButtonNew text="Make Appointment" @click="createAppt"/>
            </div>


        </div>
    </div>

    <Footer/>
</template>