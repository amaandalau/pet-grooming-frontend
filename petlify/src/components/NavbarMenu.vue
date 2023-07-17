<script setup>

const props = defineProps({
    navTitle: {
        type: String
    }
})
</script>

<template>
    <div class="px-4 py-2 rounded-md hover:cursor-pointer hover:bg-slate-100 hover:underline">
        <label class="hover:cursor-pointer hover:underline">{{ navTitle }}</label>
    </div>
</template>