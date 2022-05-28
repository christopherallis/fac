<script setup>

import { ref, defineProps } from 'vue'

const props = defineProps(['center'])

</script>

<template>
    <div class="card" :class="props.center == 'true' && 'center' ">
        <slot></slot>
    </div>
</template>

<style scoped>
    .card {
        flex-direction: row;
        padding: 10px;
        background-color: var(--surface-color);
        color: var(--color);
        margin-bottom: 5px;
        border-radius: 10px;
    }
    .center {
       text-align: center;
    }
</style>