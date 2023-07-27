<script setup>
const props = defineProps({
    src: {
        type: String,
        default: '/src/assets/illustrations/default.png'
    },
    alt: {
        type: String
    },
    text: {
        type: String
    }
})
</script>

<template>
    <img :src="src" :alt="alt" class="mx-auto my-8">
    <p class="text-center font-light text-lg my-4"> {{ text }} </p>
</template>