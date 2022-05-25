<script setup>

import { inject, ref } from 'vue'

import ModalView from '@/components/ModalView.vue'
import ModalButton from '@/components/ModalButton.vue'
import TextInput from '@/components/TextInput.vue'
import CheckList from '@/components/CheckList.vue'

import { state } from '../scanstate.js'

const axios = inject('axios')
const eventbus = inject('eventbus')

const eventList = ref([])
const eventsToAdd = ref([])

function createTicket() {
    console.log("sent request")
    let eventIdList = []
    for (let i in eventsToAdd.value) {
        eventIdList.push(eventsToAdd.value[i].id)
    }

    axios.post("/api/ticket", {
        personid: state.personInfo.id,
        list: eventIdList,
    }).then((response) => {
        if (response.status == 200) {
            eventsToAdd.value = []
            eventbus.trigger('modal-close','create-ticket')
            eventbus.trigger('list-update','ticket')
        }
    })
}

function getEventList() {
    axios.get("/api/event/").then((response) => {
        eventList.value = response.data
        console.log(response.data)
    })
}

// TODO is there a better way of doing this?
getEventList()




</script>

<template>
    <ModalView title="Add Ticket" modalName="create-ticket">
        <template #content>
            <CheckList :data="eventList" nameValue="eventname" label="Tickets to Add" v-model="eventsToAdd" />
        </template>
        <template #actions>
            <ModalButton text="Add" @click="createTicket" />
        </template>
    </ModalView>
</template>

<style scoped>

</style>