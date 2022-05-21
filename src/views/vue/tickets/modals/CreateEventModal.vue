<script setup>

import ModalView from '@/components/ModalView.vue'
import TextInput from '@/components/TextInput.vue'

</script>

<template>
    <ModalView title="Create Event" modalName="create-event">
        <template #content>
            <TextInput name="Event Name" id="event-name" />
            <TextInput name="Other Field" id="other-field" />
        </template>
    </ModalView>
</template>

<style scoped>

</style>