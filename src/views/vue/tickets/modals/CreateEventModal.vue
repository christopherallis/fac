<script setup>

import { inject, ref } from 'vue'

import ModalView from '@/components/ModalView.vue'
import ModalButton from '@/components/ModalButton.vue'
import TextInput from '@/components/TextInput.vue'

const axios = inject('axios')
const eventbus = inject('eventbus')

const eventName = ref("")
const desc = ref("")

function createEvent() {
    console.log("sent request")
    axios.post("/api/event", {
        eventName: eventName,
        desc: desc
    }).then((response) => {
        if (response.status == 200) {
            eventName.value = ""
            desc.value = ""
            eventbus.trigger('modal-close','create-event')
        }
    })
}

</script>

<template>
    <ModalView title="Create Event" modalName="create-event">
        <template #content>
            <TextInput name="Event Name" id="event-name" v-model="eventName" />
            <TextInput name="Description" id="desc" v-model="desc" />
        </template>
        <template #actions>
            <ModalButton text="Create" @click="createEvent" />
        </template>
    </ModalView>
</template>

<style scoped>

</style>