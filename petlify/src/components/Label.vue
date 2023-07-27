<script setup>

const props = defineProps({
    labelTitle: {
        type: String
    },
    labelValue: {
        type: String
    }
})
</script>

<template>
    <div class="flex flex-col gap-1">
        <label class="text-xs font-extralight" v-if="labelTitle !== ''">{{ labelTitle }}</label>
        <label class="text-lg font-semibold">{{ labelValue }}</label>
    </div>
</template>