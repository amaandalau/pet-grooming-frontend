<script setup>
import { ref } from 'vue';

const valid = ref(false);

const name = ref('');
const nameRules = [
  (value) => {
    if (value) return true;

    return 'Name is required.';
  },
  (value) => {
    if (value?.length <= 10) return true;

    return 'Name must be less than 10 characters.';
  },
];

const email = ref('');
const emailRules = [
  (value) => {
    if (value) return true;

    return 'E-mail is required.';
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;

    return 'E-mail must be valid.';
  },
];

const password = ref('')
const pwdRules = [
    (value) => {
        if(value) return true

        return 'Password is required'
    },

    (value) => {
        if (value?.length >= 8) return true

        return 'Password must be at least 8 characters'
    }
]

const props = defineProps({
    label: {
        type: String
    }
})

const getFieldValue = (label) => {
    if(label === 'Email') {
        return email.value
    } else if (label === 'Password') {
        return password.value
    } else {
        return name.value
    }
}

const getFieldRules = (label) => {
    if(label === 'Email') {
        return emailRules
    } else if (label === 'Password') {
        return pwdRules
    } else {
        return nameRules
    }
}


</script>
<template>
     <v-text-field
              :v-model="getFieldValue(label)"
              :rules="getFieldRules(label)"
              :counter="10"
              :label="label"
              variant="outlined"
              required
              class="fixed-text-field"
    ></v-text-field>
  </template>

<style>
.fixed-text-field {
    width: 300px;
    height: 40px;
}
</style>