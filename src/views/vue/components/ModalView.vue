<script setup>

import { ref, defineProps, inject } from 'vue'
import { useRouter } from 'vue-router'

const eventbus = inject('eventbus')

const props = defineProps(["title", "modalName"])
const router = useRouter()
const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}

eventbus.on("modal-open", function(name) {
    if (name == props.modalName) {
        openModal()
    } else {
        closeModal()
    }
})
eventbus.on("modal-close", function(name) {
    if (name == props.modalName || name == null) {
        closeModal()
    }
})

</script>

<template>
    <div class="modal-background" :hidden="!isOpen">
        <div class="modal" >
            <div class="top">
                <div class="title">{{ props.title }}</div>
                <div class="back material-icons" @click="closeModal">close</div>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div> 
            <div class="actions">
                <slot name="actions"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-background {
        position: fixed;
        top: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
    }
    .modal {
        display: flex;
        flex-direction: column;
        padding: 20px;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: var(--background-color);
        color: var(--color);
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
    .back {
        font-size: 30px;
        cursor: pointer;

    }

    .content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .actions {
        display: flex;
        flex-direction: row;
    }

    @media only screen and (min-width: 800px) {
        .modal-background {
            background-color: rgba(0,0,0,.5);
        }
        .modal {
            width: 400px;
            margin-left: auto;
        }
    }
</style>