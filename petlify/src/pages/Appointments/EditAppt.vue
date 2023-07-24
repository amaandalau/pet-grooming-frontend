<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PetApptHeader from '@/components/PetApptHeader.vue'
import InputNew from '@/components/InputNew.vue'
import ButtonNew from '@/components/ButtonNew.vue'
import SelectDropdown from '@/components/SelectDropdown.vue'

const getApptData = async () => {

}

</script>

<template>
    <Navbar/>

    <div class="min-h-screen">
        <PetApptHeader
            :header="`${petName}'s Appointment Details`"
            sub-header="Edit Appointment Details"
            :pet-name="petName"
            :pet-bday="petDOB"
            :pet-species="petSpecies"
            :pet-breed="petBreed"
            :pet-colour="petColour"
            :pet-weight="petWeight"
        >


      <!-- <div class="block text-center m-4" v-if="hasUpcomingAppt()">
        <label class="font-semibold text-orange-400">
            {{ petName }} has an upcomming appointment on {{ selectedDate }}!
        </label>
      </div> -->

        
            <div class="mx-10 my-6 flex flex-col gap-8">
                <div class="flex flex-row flex-wrap gap-8 items-center">

                    <SelectDropdown 
                        label="Select a Groomer" 
                        :options="groomerList.map(groomer => groomer.name)"
                        v-model="groomerName"
                    />

                    <Input
                        label="Status"
                        :value="apptStatus"
                        :disabled="true"
                    />

                    <Input label="Appointment Date" :value="selectedDate" :disabled="true" />
                </div>

                <div class="flex flex-col gap-2">
                        <label>Select an Appointment Date</label>
                        
                        <VueDatePicker
                        v-model="apptDate"
                        :enable-time-picker="false"
                        :clearable="true"
                        :close-on-auto-apply="true"
                        :show-now-button="true"
                        width="400"
                        ></VueDatePicker>
                </div>

                <v-textarea 
                    v-model="specialInstructions" 
                    label="Special Instructions" 
                    variant="outlined"
                >
                </v-textarea>

                <div class="flex flex-row items-center justify-between gap-8">

                    <div class="w-full" v-if="apptStatus === 'Confirmed'">
                        <ButtonNew 
                        text="Cancel"
                        elevation="0"
                        class="cancel"
                        @click="cancelAppt"
                        />
                    </div>

                    <div class="w-full" v-else-if="apptStatus === 'Pending'">
                        <ButtonNew 
                            text="Save Appointment" 
                            class="default"
                            @click="editAppt"
                        />
                    </div>

                    <div class="w-full" v-else-if="apptStatus === 'Cancelled'">
                        <ButtonNew 
                            text="Reschedule Appointment"
                            elevation="0"
                            class="default"
                            @click="reschedAppt"
                        />
                    </div>

                </div>

                <div class="block m-4 text-center">
                    <label class="font-light text-red-600 hover:underline hover:cursor-pointer">Delete Appointment</label>
                </div>
            </div>

        </PetApptHeader>
    </div>

    <Footer/>
</template>