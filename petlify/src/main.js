import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// import '@mdi/font/css/materialdesignicons.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'


const vuetify = createVuetify({
  components,
  directives,
  options: {
    iconfont: 'mdi'
  }
})

const app = createApp(App)
app.use(vuetify)
app.component('VueDatePicker', VueDatePicker)
app.use(createPinia())
app.use(router)
app.mount('#app')
