<script setup>

import { ref, defineProps } from 'vue'

defineProps(["title"])

</script>

<template>
    <div class="container">
        <h1>{{ title }}</h1>
        <slot></slot>
    </div>
</template>

<style scoped>
    .container {
        padding: 20px;
    }
    h1 {
        margin: 0;
        font-family: 'Montserrat', sans-serif;
    }
</style>