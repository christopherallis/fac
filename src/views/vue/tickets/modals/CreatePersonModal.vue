<script setup>

import { ref, inject } from 'vue';

import ModalView from '@/components/ModalView.vue'
import ModalButton from '@/components/ModalButton.vue'
import TextInput from '@/components/TextInput.vue'

const axios = inject('axios')
const eventbus = inject('eventbus')

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const phone = ref('')


function createPerson() {
    console.log("sent request")
    axios.post("/api/person", {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        phone: phone.value
    }).then((response) => {
        if (response.status == 200) {
            firstname.value = ""
            lastname.value = ""
            email.value = ""
            phone.value = ""
            eventbus.trigger('modal-close','create-person')
            eventbus.trigger('list-update','person')
        }
    })
}

</script>

<template>
    <ModalView title="Add Person" modalName="create-person">
        <template #content>
            <TextInput name="First Name*" id="first-name" v-model="firstname" />
            <TextInput name="Last Name*" id="last-name" v-model="lastname" />
            <TextInput name="Email" id="email" v-model="email" />
            <TextInput name="Phone" id="phone" v-model="phone" />
        </template>
        <template #actions>
            <ModalButton text="Create" @click="createPerson" />
        </template>
    </ModalView>
</template>

<style scoped>

</style>