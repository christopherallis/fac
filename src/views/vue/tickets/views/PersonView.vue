<script setup>

import { inject, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import BaseView from '@/components/BaseView.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import ActionButton from '@/components/ActionButton.vue'

import { state } from '../scanstate.js'

const axios = inject('axios')
const eventbus = inject('eventbus')
const router = useRouter()

const personInfo = ref({})
const ticketList = ref([])

function getPerson() {
    axios.get("/api/person/"+router.currentRoute.value.params.id).then((response) => {
        personInfo.value = response.data
    })
}

function getTickets() {
    axios.get("/api/person/"+router.currentRoute.value.params.id+"/ticket").then((response) => {
        ticketList.value = response.data
    })
}

getPerson()
getTickets()

eventbus.on('list-update',(name) => {
    if (name == "ticket") {
        getPerson()
        getTickets()
    }
})


</script>

<template>
    <BaseView title="Persons" back="true">
        <template #actions>
            <ActionButton icon="add" :onPress="() => eventbus.trigger('modal-open','create-ticket')" />
            <!--<ActionButton icon="edit" :onPress="() => eventbus.trigger('modal-open','create-person')" />-->
        </template>
        <template #content>
            <div>Name: {{ personInfo.firstname}} {{personInfo.lastname}}</div>
            <List title="Tickets">
                <ListItem v-for="ticket in ticketList" :key="ticket.id" :text="ticket.eventname" />
            </List>
        </template>
    </BaseView>
</template>

<style scoped>

</style>