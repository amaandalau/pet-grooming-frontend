<script setup>
import DefaultPetAvatar from './DefaultPetAvatar.vue';


const props = defineProps({
    header: {
        type: String
    },
    subHeader: {
        type: String
    },
    petName: {
        type: String
    },
    petBday: {
        type: String
    },
    petSpecies: {
        type: String
    },
    petBreed: {
        type: String
    },
    petColour: {
        type: String
    },
    petWeight: {
        type: Number
    }
})
</script>

<template>
    <div>
        <div class="py-2">
            <label class="mx-6 text-xl font-semibold">{{ header }}</label>
        </div>
        
        <!-- Pet Info -->
        <div class="flex flex-row items-center justify-start">
            
            <DefaultPetAvatar/>
            
            <div class="w-1/2 border border-blue-500 flex flex-col">
                <!-- Pet Details -->
                <div class="flex flex-row items-center justify-between">
                    <label class="text-xl font-semibold">{{ petName }}</label>
                    <label>{{ petBday }}</label>
                </div>
                
                <div class="flex flex-row items-center justify-between">
                    <label>{{ petSpecies }}</label>
                    <label>{{ petBreed }}</label>
                </div>
                
                <div class="flex flex-row items-center justify-between">
                    <label>{{ petColour }}</label>
                    <label>{{ petWeight }} KG</label>
                </div>
            </div>
        </div>
        
        <div class="py-2 bg-white drop-shadow-md rounded-lg">
            <label class="mx-6 text-xl font-semibold">{{ subHeader }}</label>
        </div>
    </div>

    <slot></slot>
</template>