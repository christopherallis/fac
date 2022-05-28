<script setup>

import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseView from '@/components/BaseView.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import ActionButton from '@/components/ActionButton.vue'

const axios = inject('axios')
const eventbus = inject('eventbus')
const router = useRouter()

const eventid = ref()
const ticketList = ref([])

function ticketPressFactory(ticket) {
    console.log(ticket.uuid)
    return function() {
        axios.post("/api/ticket/consume", {
            eventid: router.currentRoute.value.params.id,
            uuid: ticket.uuid
        }).then((response) => {
            for (let index in ticketList.value) {
                if (ticketList.value[index].id == ticket.id) {
                    ticketList.value[index].consumed = true
                }
            }
        })
    }
}

function getTicketList() {
    axios.get(`/api/ticket`,{
        params: {eventid: router.currentRoute.value.params.id}
    }).then((response) => {
        ticketList.value = response.data
        console.log(response.data)
    })
}

// TODO is there a better way of doing this?
getTicketList()



</script>

<template>
    <BaseView title="Manual Scan-In" back="true">
        <template #content>
            <List>
                <ListItem v-for="ticket in ticketList" :key="ticket.id" :selected="ticket.consumed" :text="ticket.firstname+' '+ticket.lastname" :onPress="ticketPressFactory(ticket)" />
            </List>
        </template>
    </BaseView>
</template>

<style scoped>

</style>