// 全局注册 composition api
// import * as api from 'vue'
// for(let key in api) window[key] = api[key]
import './assets/style/main.scss'
import './lib/htmlReset'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
const app = createApp(App)

import plugins from './plugins'

app.use(createPinia())
app.use(router)
app.use(plugins)

app.mount('#app')


