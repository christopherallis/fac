import { createApp } from "vue";
import App from "./Tickets.vue";
import { createRouter, createWebHashHistory } from 'vue-router'

import PersonView from './views/PersonView.vue'
import RouterView from './views/RouterView.vue'
import EventView from './views/EventView.vue'
import ScanView from './views/ScanView.vue'

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
        { path: '/person', component: PersonView },
    ],
})



const app = createApp(App)

app.use(router)
app.provide("eventbus", eventbus)

app.mount("#app")

router.replace("event")