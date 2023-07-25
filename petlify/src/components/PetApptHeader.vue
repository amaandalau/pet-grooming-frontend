<script setup>
import DefaultPetAvatar from './DefaultPetAvatar.vue';
import Label from './Label.vue';

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
    petOwner: {
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
        <div class="flex flex-row items-center justify-start gap-8">
            
            <DefaultPetAvatar/>

            <div class="flex flex-col items-start justify-between gap-8">
                <Label label-title="Pet's Name" :label-value="petName"/>
                <Label label-title="Pet's Owner" :label-value="petOwner"/>

            </div>

            <div class="ml-8">
                <div class="flex flex-col items-center justify-between gap-8">
                    <div class="flex flex-row items-center justify-between gap-20">
                        <Label label-title="Species" :label-value="petSpecies"/>
                        <Label label-title="Breed" :label-value="petBreed"/>
                    </div>
                    
                    <div class="flex flex-row items-center justify-between gap-20">
                        <Label label-title="Colour" :label-value="petColour"/>
                        <Label label-title="Weight (KG)" :label-value="petWeight"/>
                    </div>
                </div>
            </div>

        </div>
        
        <div class="py-2 bg-transparent border-b rounded-lg">
            <label class="mx-6 text-xl font-semibold">{{ subHeader }}</label>
        </div>
    </div>

    <slot></slot>
</template>