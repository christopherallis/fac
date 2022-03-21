<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <test2></test2>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>