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
        type: [Number, String]
    }
})
</script>

<template>
    <div>
        <div class="py-2">
            <label class="mx-6 text-xl font-semibold">{{ header }}</label>
        </div>
        
        <!-- Pet Info -->
        <div class="flex flex-row items-center justify-start gap-10">
            <div>
                <DefaultPetAvatar/>
            </div>

            <div class="flex flex-col items-start justify-between gap-10">
                <div class="flex flex-row items-start justify-between gap-16">
                    <!-- Top Row -->
                    <Label label-title="Birthday" :label-value="petBday"/>
                    <Label label-title="Breed" :label-value="petBreed"/>
                    <Label label-title="Species" :label-value="petSpecies"/>
                </div>

                <div class="flex flex-row items-start justify-between gap-16">
                    <!-- Bottom Row -->
                    <Label label-title="Colour" :label-value="petColour"/>
                    <Label label-title="Weight (KG)" :label-value="petWeight"/>
                    <Label label-title="Owner" :label-value="petOwner"/>
                </div>
            </div>
        </div>
        
        <div class="py-2 bg-transparent border-b rounded-lg">
            <label class="mx-6 text-xl font-semibold">{{ subHeader }}</label>
        </div>
    </div>

    <slot></slot>
</template>