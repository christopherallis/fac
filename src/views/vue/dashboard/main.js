import { createApp } from "vue";
import App from "./Dashboard.vue";
import { createRouter, createWebHashHistory } from 'vue-router'

import AnalyticsView from './views/AnalyticsView.vue'
import WebsiteView from './views/WebsiteView.vue'
import EventsView from './views/EventsView.vue'
import UsersView from './views/UsersView.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/analytics', alias: "/", component: AnalyticsView },
        { path: '/website', component: WebsiteView },
        { path: '/events', component: EventsView },
        { path: '/users', component: UsersView }
    ],
})

const app = createApp(App)

app.use(router)

app.mount("#app")
