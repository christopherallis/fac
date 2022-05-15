<script setup>

import { ref, defineProps } from 'vue'

const props = defineProps(["title"])

</script>

<template>
    <div class="list">
        <div class="title">{{ props.title }}</div>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .list {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .title {
        font-size: 25px;
        font-weight: bold;
        margin-bottom: 3px;
        margin-left: 5px;
    }
</style>