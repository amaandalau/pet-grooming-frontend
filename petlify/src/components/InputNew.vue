<script setup>
import { ref } from 'vue';

const props = defineProps({
    label: {
        type: String
    },
    showRules: {
      type: Boolean,
      default: true
    },
    showCounter: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'outlined'
    },
    placeholder: {
      type: String
    },
    readonly: {
      type: Boolean,
      default: false
    }, 
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String
    }
})

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
        return props.showRules ? emailRules : []
    } else if (label === 'Password') {
        return props.showRules ? pwdRules : []
    } else if (label  === 'Name') {
        return props.showRules ? nameRules : []
    } else {
      return []
    }
}

const updateFieldValue = (inputValue) => {
  if (label === 'Email') {
    email.value = inputValue
  } else if (label === 'Password') {
    password.value = inputValue
  } else {
    name.value = inputValue
  }
}


</script>
<template>
     <v-text-field
              :value="value"
              :v-model="getFieldValue(label)"
              :rules="getFieldRules(label)"
              :counter="showCounter ? 10 : undefined"
              :label="label"
              :variant="variant"
              :placeholder="placeholder"
              :readonly="readonly"
              :disabled="disabled"
              required
              class="fixed-text-field"
              @update:value="updateFieldValue"
    ></v-text-field>
  </template>

<style>
.fixed-text-field {
    width: 300px;
    height: 40px;
}
</style>