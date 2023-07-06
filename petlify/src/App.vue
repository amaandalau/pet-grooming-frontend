<script setup>
import { RouterView } from 'vue-router'

</script>

<template>
  <RouterView/>

  <footer class="fixed bottom-0 left-0 right-0 p-4 border border-slate-800">
        <div class="text-center">
            <label class="text-sm font-normal text-gray-600">
              &copy; {{ new Date().getFullYear() }} All rights reserved | @amaandalau
            </label>
        </div>
  </footer>
</template>