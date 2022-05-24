<script setup>

import { ref } from 'vue';

import ModalView from '@/components/ModalView.vue'
import ModalButton from '@/components/ModalButton.vue'
import TextInput from '@/components/TextInput.vue'


</script>

<template>
    <ModalView title="Add Person" modalName="create-person">
        <template #content>
            <TextInput name="First Name*" id="first-name" v-model="firstName" />
            <TextInput name="Last Name*" id="last-name" />
            <TextInput name="Email" id="email" />
            <TextInput name="Phone" id="phone" />
        </template>
        <template #actions>
            <ModalButton text="Create" />
        </template>
    </ModalView>
</template>

<style scoped>

</style>