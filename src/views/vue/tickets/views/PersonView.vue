<script setup>

import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseView from '@/components/BaseView.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import ActionButton from '@/components/ActionButton.vue'

import { state } from '../scanstate.js'

const eventbus = inject('eventbus')
const router = useRouter()

const scanModeActive = ref(false)

function itemPersonFactory(personInfo) {
    return function() {
        if (scanModeActive.value) {
            // select person
        } else {
            state.personInfo = personInfo
            router.push(`/person/${personInfo.id}`)
        }
    }
}

</script>

<template>
    <BaseView title="Persons" back="true">
        <template #actions>
            <ActionButton icon="edit" :onPress="() => eventbus.trigger('modal-open','create-person')" />
        </template>
        <template #content>
            <div>Name: Christopher Allis</div>
            <List title="Tickets">
                <ListItem text="Event 1 - 3/14/22 3:14PM" />
            </List>
        </template>
    </BaseView>
</template>

<style scoped>

</style>