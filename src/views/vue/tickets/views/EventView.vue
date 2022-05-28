<script setup>

import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseView from '@/components/BaseView.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import ActionButton from '@/components/ActionButton.vue'

import { state } from '../scanstate.js'

const axios = inject('axios')
const eventbus = inject('eventbus')
const router = useRouter()

const eventList = ref([])

function itemEventFactory(eventInfo) {
    return function() {
        state.eventInfo = eventInfo
        router.push(`/event/${eventInfo.id}/scan`)
    }
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
    <BaseView title="Events">
        <template #actions>
            <ActionButton icon="add" :onPress="() => eventbus.trigger('modal-open','create-event')" />
        </template>
        <template #content>
            <List>
                <ListItem v-for="event in eventList" :key="event.id" :text="event.eventname" :onPress="itemEventFactory(event)" />
            </List>
        </template>
    </BaseView>
</template>

<style scoped>

</style>