<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    variant: {
        type: String,
        default: 'default'
    }
})

// const btnClass = computed(() => `${props.variant}`)
</script>

<template>
    <button class="border-black px-4 py-2 rounded-xl text-center hover:cursor-pointer">
        {{ title }}
    </button>

    <!-- <button :class=btnClass>
        {{ title }}
    </button> -->
</template>

<style>
.default {
    background-color: white;
    border: 1px solid black;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    text-align: center;
}

.default:hover {
    background-color: black;
    color: white;
    cursor: pointer;
}

.secondary {
    background-color: #BDE0FE;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    text-align: center;
    color: black;
}

.secondary:hover {
    background-color: #a6d1f7;
    cursor: pointer;
}

.link {
    background-color: transparent;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    text-align: center;
    color: black
}

.link:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>