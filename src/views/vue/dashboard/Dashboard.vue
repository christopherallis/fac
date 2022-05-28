<script setup>
import { ref } from 'vue'
import '@/tempcolor.css'

import Navigation from '@/components/Navigation.vue'
import NavButton from '@/components/NavButton.vue'

</script>

<template>
  <Navigation title="FAC Dashboard">
    <NavButton route="/" icon="space_dashboard" text="Anaylitics" />
    <NavButton route="/website" icon="wysiwyg" text="Website" />
    <NavButton route="/events" icon="event" text="Events" />
    <NavButton route="/users" icon="people" text="Users" />
  </Navigation>
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