<script setup>

import { ref, defineProps } from 'vue'

const props = defineProps(['icon','onPress','active'])

</script>

<template>
    <div class="item" :class="props.active ? 'active' : ''" @click="props.onPress">
        <div class="material-icons">{{ props.icon }}</div>
    </div>
</template>

<style scoped>
    .item {
        display: flex;
        flex-direction: row;
        padding: 5px;
        background-color: var(--background-color);
        color: var(--color);
        border-radius: 5px;
        cursor: pointer;
        margin-left: 5px;
    }
    .item:hover {
        background-color: var(--surface-color);
    }
    .item.active {
        background-color: var(--accent-color);
    }
</style>