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
    <BaseView title="Persons">
        <template #actions>
            <ActionButton icon="qr_code_scanner" :onPress="() => scanModeActive = !scanModeActive" :active="scanModeActive" />
            <ActionButton icon="add" :onPress="() => eventbus.trigger('modal-open','create-person')" />
        </template>
        <template #content>
            <List>
                <ListItem text="Christopher Allis" :onPress="itemPersonFactory({id: 0, name: 'event1'})"/>
                <ListItem text="Sandy Hanna" :onPress="itemPersonFactory({id: 1, name: 'event2'})"/>
            </List>
        </template>
    </BaseView>
</template>

<style scoped>

</style>