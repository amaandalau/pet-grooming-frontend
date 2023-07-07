<script setup>
const props = defineProps({
    text: {
        type: String
    },
    rounded: {
        type: String
    },
    class: {
        type: String,
        default: 'default'
    },
    size: {
        type: String,
        default: "x-large"
    },
    elevation: {
        type: String
    }
})
</script>

<template>
    <v-btn block 
        :rounded="rounded" 
        :size="size" 
        :class="class"
        :elevation="elevation"
    >
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

.link {
    background-color: transparent;
    border: none;
    color: black;
}

.link:hover {
    cursor: pointer;
    background-color: white;
    text-decoration: underline;
}
</style>