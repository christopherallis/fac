import { createApp } from "vue";
import App from "./Tickets.vue";
import { createRouter, createWebHashHistory } from 'vue-router'

import TicketsView from './views/TicketsView.vue'
import EventsTop from './views/EventsTop.vue'
import EventsView from './views/EventsView.vue'
import ScanView from './views/ScanView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/tickets', component: TicketsView },
        { path: '/events/:id?', component: EventsTop,
            children: [
                { path: '', component: EventsView },
                { path: 'scan', component: ScanView }
            ]
        },

    ],
})

const app = createApp(App)

app.use(router)

app.mount("#app")

