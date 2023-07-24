<script setup>
import { computed, ref, watchEffect } from 'vue';

const props = defineProps({
    label: {
        type: String
    },
    subLabel: {
        type: String
    },
    options: {
        type: Object,
    },
    modelValue: {
        type: String,
        default: null
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['update:modelValue'])
// const modelValue = ref(props.value)

// const selectedValueA = computed(() => props.value)

const selectedValue = computed({
    // get: () => modelValue.value,
    get: () => props.modelValue,
    set: (newValue) => {
        // modelValue.value = newValue
        console.log('New Value:', newValue)
        emits('update:modelValue', newValue)
    }
}) 

watchEffect(() => {
    console.log('SelectDD:', selectedValue.value)
})

</script>

<template>
    <div class="flex flex-col gap-1 w-auto">
        <label v-if="label !== ''" class="mx-1 font-medium text-black text-left">{{ label }}</label>
        
        <select v-model="selectedValue"
            class="px-5 py-3 border border-black rounded-md focus:border-slate-800 outline-none"
            :disabled="disabled"
        >
            <option value="" disabled selected>{{ subLabel }}</option>
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