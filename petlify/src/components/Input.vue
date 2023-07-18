<script setup>

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String
  },
  label: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  }

})

const emits = defineEmits(['update:value'])
</script>

<template>
  <div class="flex flex-col items-start justify-center  gap-2 w-auto">
    <label v-if="label !== ''" class="text-left"> {{ label }}</label>
    <input 
    type="text"
    :value="value"
    :placeholder="placeholder"
    :disabled="disabled"
    @input="$emit('update:value', $event.target.value)"

    :class="{
        'w-80  px-4 py-4 outline rounded-sm focus:outline-1 focus:outline-slate-950': true,
        'opacity-30 cursor-not-allowed': disabled
      }"
    >
  </div>
</template>