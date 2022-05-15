<script setup>

import { ref, defineProps } from 'vue'

const props = defineProps(['text','onPress'])

</script>

<template>
    <div class="item" @click="props.onPress">
        <div class="text">{{ props.text }}</div>
        <div class="material-icons" v-show="props.onPress != null">chevron_right</div>
    </div>
</template>

<style scoped>
    .item {
        display: flex;
        flex-direction: row;
        padding: 10px;
        background-color: var(--surface-color);
        color: var(--color);
        margin-bottom: 5px;
        border-radius: 10px;
        cursor: pointer;
    }
    .text {
        flex-grow: 1;
    }
</style>