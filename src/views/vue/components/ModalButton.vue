<script setup>

import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps(['text','onPress','deactivated'])
const emits = defineEmits(['click'])

</script>

<template>
    <div class="item" :class="props.deactivated ? 'deactivated' : ''" @click="() => emits('click')">
        {{ props.text }}
    </div>
</template>

<style scoped>
    .item {
        display: block;
        text-align: center;
        flex-direction: row;
        padding: 10px;
        background-color: var(--accent-color);
        color: var(--accent-text-color);
        border-radius: 10px;
        cursor: pointer;
        flex-grow: 1;
    }
    .item.deactivated {
        background-color: var(--accent-color);
    }
</style>