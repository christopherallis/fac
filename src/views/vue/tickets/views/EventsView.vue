<script setup>

import { useRouter } from 'vue-router'

import BaseView from '@/components/BaseView.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'

import { state } from '../scanstate.js'

const router = useRouter()



function itemEventFactory(eventInfo) {
    return function() {
        state.eventInfo = eventInfo
        router.push(`/events/${eventInfo.id}/scan`)
    }
}

</script>

<template>
    <BaseView title="Events">
        <List>
            <ListItem text="Event 1" :onPress="itemEventFactory({id: 0, name: 'event1'})"/>
            <ListItem text="Event 2" :onPress="itemEventFactory({id: 1, name: 'event2'})"/>
        </List>
    </BaseView>
</template>

<style scoped>

</style>