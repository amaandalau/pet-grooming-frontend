<script setup>
import { ref } from 'vue';

const props = defineProps({
    label: {
        type: String
    },
    options: {
        type: Array,
        required: true
    }
})

const selectedValue = ref('')
</script>

<template>
    <div class="flex flex-col gap-4">
        <label class="font-semibold text-black text-left">{{ label }}</label>
        <select v-model="selectedValue"
            class="px-5 py-3 border border-black rounded-md focus:border-slate-800 outline-none"
        >
            <option value="" disabled selected>{{ label }}</option>
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<style scoped>
select:focus {
    border-color: slategrey;
}
</style>