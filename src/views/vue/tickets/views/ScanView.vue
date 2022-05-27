<script setup>

import { onMounted, onUnmounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
//import { StreamBarcodeReader } from 'vue-barcode-reader'

import BaseView from '@/components/BaseView.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import Card from '@/components/Card.vue'

const axios = inject('axios')
const router = useRouter()
const eventId = ref(router.currentRoute.value.params.id)


const history = ref([])


function onDecode(result) {
    axios.post("/api/ticket/consume", {
        eventid: eventId.value,
        uuid: result,
    }).then((response) => {
        if (response.status == 200) {
            history.value.push("Success")
        }
            
    }).catch((error) => {
        if (error.response.status == 400) {
            history.value.push("Failure")
        } else {
            console.log("Not Found")
        }
    })

}

let debounce = 0;
let message = ""
function onKeyDown(e) {
    const t = Date.now()
    if (t - debounce > 100) {
        message = ""
    }
    debounce = t
    if (e.key == "Enter"){
        if (message != "") onDecode(message)
        debounce = 0
        message = ""
    }
    else if (e.key.length == 1) message += e.key

}


onMounted(() => {
    window.addEventListener('keydown',onKeyDown)
})
onUnmounted(()=> {
    window.removeEventListener('keydown', onKeyDown)
})

</script>

<template>
    <BaseView title="Scan" back="true">
        <template #content>
            <Card center="true">
                <div>Scanning...</div>
            </Card>
        
            <List title="History">
                <ListItem v-for="(val, index) in history" :key="index" :text="val" />
            </List>
        </template>
    </BaseView>
</template>

<style scoped>

</style>