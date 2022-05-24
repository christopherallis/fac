import { createApp } from "vue";
import App from "./Tickets.vue";
import { createRouter, createWebHashHistory } from 'vue-router'


import RouterView from './views/RouterView.vue'
import EventView from './views/EventView.vue'
import ScanView from './views/ScanView.vue'
import PersonListView from './views/PersonListView.vue'
import PersonView from './views/PersonView.vue'

import axios from "axios"
import VueAxios from "vue-axios";
import eventbus from '@/lib/event.js'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/event/:id?', component: RouterView,
            children: [
                { path: '', component: EventView },
                { path: 'scan', component: ScanView }
            ]
        },
        { path: '/person', component: RouterView, 
            children: [
                { path: '', component: PersonListView },
                { path: ':id', component: PersonView }
            ]
        },
    ],
})



const app = createApp(App)

const a = axios.create({
    baseURL: 'http://localhost:3002'
})

app.use(router)
app.use(VueAxios,process.env.NODE_ENV == 'development' ? a : axios)
app.provide('axios', app.config.globalProperties.axios)
app.provide("eventbus", eventbus)

app.mount("#app")

router.replace("event")