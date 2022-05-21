<script setup>

import { defineProps } from 'vue'

const props = defineProps(["name", "id"])

</script>

<template>
    <div class="text-input">
        <label :for="props.id" >{{ props.name }}</label>
        <input type="text" :id="props.id" />
    </div>
</template>

<style scoped>
    .text-input{
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
    label {
        padding: 5px;
    }
    input {
        border-radius: 10px;
        background-color: var(--surface-color);
        color: var(--color);
        padding: 10px;
        border: none;
    }
</style>