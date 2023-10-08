// 全局注册 composition api
// import * as api from 'vue'
// for(let key in api) window[key] = api[key]
import './assets/style/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import router from './router'
app.use(router)

import store from './store'
app.use(store)

import plugins from './plugins'
app.use(plugins)

app.mount('#app')