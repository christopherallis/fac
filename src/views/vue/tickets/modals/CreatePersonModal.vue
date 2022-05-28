<script setup>

import { ref, inject } from 'vue';

import ModalView from '@/components/ModalView.vue'
import ModalButton from '@/components/ModalButton.vue'
import TextInput from '@/components/TextInput.vue'

const axios = inject('axios')
const eventbus = inject('eventbus')

const firstname = ref('')
const lastname = ref('')
const uuid = ref('')
const agegroup = ref('')


function createPerson() {
    console.log("sent request")
    axios.post("/api/person", {
        firstname: firstname.value,
        lastname: lastname.value,
        uuid: uuid.value,
        agegroup: agegroup.value
    }).then((response) => {
        if (response.status == 200) {
            firstname.value = ""
            lastname.value = ""
            uuid.value = ""
            agegroup.value = ""
            eventbus.trigger('modal-close','create-person')
            eventbus.trigger('list-update','person')
        }
    })
}

</script>

<template>
    <ModalView title="Add Person" modalName="create-person">
        <template #content>
            <TextInput name="First Name*" id="firstname" v-model="firstname" />
            <TextInput name="Last Name*" id="lastname" v-model="lastname" />
            <TextInput name="QR Code" id="uuid" v-model="uuid" />
            <TextInput name="Age Groups" id="agegroup" v-model="agegroup" />
        </template>
        <template #actions>
            <ModalButton text="Create" @click="createPerson" />
        </template>
    </ModalView>
</template>

<style scoped>

</style>