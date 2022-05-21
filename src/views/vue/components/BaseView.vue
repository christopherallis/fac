<script setup>

import { ref, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(["title","back"])
const router = useRouter()
</script>

<template>
    <div class="container">
        <div class="top">
            <div class="back material-icons" v-show="props.back == 'true'" @click="() => router.go(-1)">chevron_left</div>
            <div class="title">{{ props.title }}</div>
            <div class="actions">
                <slot name="actions"></slot>
            </div>
        </div>
        <slot name="content"></slot>
    </div>
</template>

<style scoped>
    .container {
        padding: 20px;
        width: 100%;
        box-sizing: border-box;
    }
    .top {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
    }
    .title {
        font-size: 30px;
        font-weight: bold;
        font-family: 'Montserrat', sans-serif;
        
        flex-grow: 1;
    }
    .actions {
        display: flex;
        flex-direction: row;
    }
    .back {
        font-size: 30px;
        cursor: pointer;

    }
</style>