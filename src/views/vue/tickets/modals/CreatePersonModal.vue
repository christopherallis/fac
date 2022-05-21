<script setup>

import ModalView from '@/components/ModalView.vue'
import TextInput from '@/components/TextInput.vue'

</script>

<template>
    <ModalView title="Add Person" modalName="create-person">
        <template #content>
            <TextInput name="First Name*" id="first-name" />
            <TextInput name="Last Name*" id="last-name" />
            <TextInput name="Email" id="email" />
            <TextInput name="Phone" id="phone" />
        </template>
    </ModalView>
</template>

<style scoped>

</style>