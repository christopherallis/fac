import { createApp } from "vue";
import App from "./Tickets.vue";
import { createRouter, createWebHashHistory } from 'vue-router'


import RouterView from './views/RouterView.vue'
import EventView from './views/EventView.vue'
import ScanView from './views/ScanView.vue'
import PersonListView from './views/PersonListView.vue'
import PersonView from './views/PersonView.vue'

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
        { path: '/person/:id?', component: RouterView, 
            children: [
                { path: '', component: PersonListView },
                { path: ':id', component: PersonView }
            ]
        },
    ],
})



const app = createApp(App)

app.use(router)
app.provide("eventbus", eventbus)

app.mount("#app")

router.replace("event")