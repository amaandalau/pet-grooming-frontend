<script setup>
import ButtonNew from './ButtonNew.vue';
import Buttons from './Buttons.vue';
import Logo from './icons/Logo.vue';
const props = defineProps({

})
</script>

<template>
    <div class="bg-white flex flex-row items-center justify-between p-4 z-50 drop-shadow-sm">

        <router-link to="/">
            <div class="flex flex-row justify-start gap-1 hover:cursor-pointer">
                <Logo/>
                <label class="font-semibold text-xl hover:cursor-pointer">Petlify</label>
            </div>
        </router-link>

        <div class="flex flex-row justify-evenly gap-4">
            <router-link to="/">
                <Buttons class="link" title="Home"/>
            </router-link>

            <router-link to="/about">
                <Buttons class="link" title="About"/>
            </router-link>

            <router-link to="/signup">
                <Buttons class="default" title="Sign Up"/>
                <!-- <ButtonNew text="Sign Up"/> -->
            </router-link>
        </div>

    </div>

</template>