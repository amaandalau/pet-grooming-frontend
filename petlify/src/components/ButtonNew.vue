<script setup>
const props = defineProps({
    text: {
        type: String
    },
    rounded: {
        type: String
    }
})
</script>

<template>
    <v-btn block :rounded="rounded" size="x-large" class="default">
        <span class="button-text">{{ text }}</span>
    </v-btn>
</template>

<style>
.default {
    background: black !important;
    color: white !important;
}

.button-text {
    text-transform: none;
}
</style>