<script setup>
import ButtonNew from '../components/ButtonNew.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const goToEditPet = () => {
    router.push('/editPet')
}

</script>

<template>
    <div class="border border-black rounded-xl h-full w-80 flex flex-col items-center">
        <div class="rounded-xl h-64 w-full">
            <img src="https://images.unsplash.com/photo-1583511666372-62fc211f8377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlbmNoaWV8ZW58MHwxfDB8fHwy&auto=format&fit=crop&w=1400&q=60" alt=""
                class="object-cover h-full w-full rounded-t-xl"
            >
        </div>

        <div class="w-full inline-block px-2">

            <div class="my-2 justify-self-end text-right hover:underline" @click="goToEditPet">
                <label class="font-light text-xs hover:cursor-pointer">Edit Pet</label>
            </div>

            <div class="flex flex-col gap-4 mt-2 mb-6">
                <!-- Details -->
                <div class="flex flex-row items-center gap-2 mb-4">
                    <label class="font-semibold text-2xl">Pet Name</label>
                    <label class="text-sm">5 years old</label>
                </div>

                <!-- Date Of Birth -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-lg">D.O.B</label>
                    <label class="w-2/3 text-left">30 September 2018</label>
                </div>

                <!-- Species -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-lg">Species</label>
                    <label class="w-2/3 text-left">Dog</label>
                </div>

                <!-- Breed -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-lg">Breed</label>
                    <label class="w-2/3 text-left">Nova Scotia Duck Tolling Retriever</label>
                </div>

                <!-- Color -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-lg">Colour</label>
                    <label class="w-2/3">White with Black Spots</label>
                </div>

                <!-- Weight -->
                <div class="flex flex-row items-center">
                    <label class="w-1/3 font-semibold text-lg">Weight</label>
                    <label class="w-2/3 text-left">5.30 KG</label>
                </div>

            </div>
            
        </div>
        <ButtonNew text="Make an appointment" rounded="lg" elevation="0" size="large"/>
    </div>
</template>