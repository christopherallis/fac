<script setup>

import { defineProps, defineEmits } from 'vue'

const props = defineProps(["name", "placeholder", "modelValue"])
const emit = defineEmits(["update:modelValue"])

</script>

<template>
    <div class="text-input">
        <label v-show="props.name" >{{ props.name }}</label>
        <input
            type="text" :value="props.modelValue" :placeholder="placeholder"
            @input="(event) => emit('update:modelValue', event.target.value)"
        />
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
        font-size: inherit;
    }
</style>