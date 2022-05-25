<script setup>

import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps(["data", "nameValue", "modelValue", "label"])
const emit = defineEmits(["update:modelValue"])

const selectedList = ref([])

function updateList(item, value) {
    if (value) {
        if (selectedList.value.indexOf(item) === -1) selectedList.value.push(item)
    } else {
        selectedList.value = selectedList.value.filter((e) => e.id != item.id)
    }
    emit('update:modelValue', selectedList.value)
}

</script>

<template>
    <div class="list-input">
        <div>{{props.label}}</div>
        <label v-for="item in data" :key="item.id">
            <input type="checkbox" @input="(event) => updateList(item, event.target.checked)"/>
            {{ item[props.nameValue] }}
        </label>
    </div>
</template>

<style scoped>
    .list-input {
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
    label {
        padding: 5px;
        border-radius: 10px;
        background-color: var(--surface-color);
        color: var(--color);
        padding: 10px;
        margin-bottom: 5px;
    }
</style>