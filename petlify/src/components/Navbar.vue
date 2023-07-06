<script setup>
import Buttons from './Buttons.vue';
import Logo from './icons/Logo.vue';
const props = defineProps({

})
</script>

<template>
    <div class="bg-[#BDE0FE] flex flex-row items-center justify-between p-4">

        <div class="flex flex-row justify-start gap-1">
            <Logo/>
            <label class="font-semibold text-xl">Petlify</label>
        </div>

        <div class="flex flex-row justify-evenly gap-4">
            <slot>
            </slot>
        </div>

    </div>

</template>