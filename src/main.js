import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import AppLayout from './AppLayout.vue'
import router from './router'

const app = createApp(AppLayout)

app.use(createPinia())
app.use(router)

app.mount('#app')
