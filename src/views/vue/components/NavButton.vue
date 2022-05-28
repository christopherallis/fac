<script setup>
import { ref, defineProps } from 'vue'

defineProps(["icon", "text", "route"])
</script>

<template>
    <router-link :to="route">
        <div class="material-icons">{{ icon }}</div>
        <div>{{ text }}</div>
    </router-link>
</template>

<style scoped>
    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
    }
    .material-icons {
        margin-right: 5px;
    }

    a:hover::before {
        display: block;
        position: absolute;
        content: ' ';
        width: 6px;
        height: 60%;
        left: -3px;
        background-color: var(--accent-color);
        border-radius: 10px;
        
    }
</style>