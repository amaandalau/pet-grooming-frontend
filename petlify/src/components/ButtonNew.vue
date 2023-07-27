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
    },
    size: {
        type: String,
        default: "x-large"
    },
    elevation: {
        type: String
    }
})

const emits = defineEmits(['click'])
</script>

<template>
    <v-btn block 
        :rounded="rounded" 
        :size="size" 
        :class="class"
        :elevation="elevation"
        @click="$emit('click')"
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
    background-color: none;
    border: none;
    color: black;
}

.link:hover {
    cursor: pointer;
    background-color: white;
    border: none;
    text-decoration: underline;
}

.cancel {
    background: transparent;
    border: 1px solid black;
    color: black;
}

.cancel:hover {
    background: red;
    border: 1px solid red;
    color: white;
    cursor: pointer;
    text-decoration: underline;
}
</style>