<script setup>
import { ref } from 'vue'
import test2 from 'test2'

const count = ref(0)
</script>

<template>
  <test2></test2>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>