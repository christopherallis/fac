<script setup>
import { ref } from 'vue'
import '@/tempcolor.css'

import Navigation from '@/components/Navigation.vue'
import NavButton from '@/components/NavButton.vue'

import CreateEventModal from './modals/CreateEventModal.vue'
import CreatePersonModal from './modals/CreatePersonModal.vue'

</script>

<template>
  <div>
    <Navigation title="FAC Tickets">
      <NavButton route="/event" icon="local_activity" text="Events" />
      <NavButton route="/person" icon="group" text="Persons" />
    </Navigation>
    <CreateEventModal />
    <CreatePersonModal />
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;700&family=Roboto&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  body {
    padding: 0;
    margin: 0;
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-color);
    color: var(--color);
  }
</style>