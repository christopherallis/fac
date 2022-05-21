<script setup>

import { inject } from 'vue'
import { useRouter } from 'vue-router'

import BaseView from '@/components/BaseView.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import ActionButton from '@/components/ActionButton.vue'

import { state } from '../scanstate.js'

const eventbus = inject('eventbus')
const router = useRouter()



function itemEventFactory(eventInfo) {
    return function() {
        state.eventInfo = eventInfo
        router.push(`/event/${eventInfo.id}/scan`)
    }
}

</script>

<template>
    <BaseView title="Events">
        <template #actions>
            <ActionButton icon="add" :onPress="() => eventbus.trigger('modal-open','create-event')" />
        </template>
        <template #content>
            <List>
                <ListItem text="Event 1" :onPress="itemEventFactory({id: 0, name: 'event1'})"/>
                <ListItem text="Event 2" :onPress="itemEventFactory({id: 1, name: 'event2'})"/>
            </List>
        </template>
    </BaseView>
</template>

<style scoped>

</style>