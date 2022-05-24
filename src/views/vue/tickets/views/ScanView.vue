<script setup>

import { onMounted, onUnmounted } from 'vue'
//import { StreamBarcodeReader } from 'vue-barcode-reader'

import BaseView from '@/components/BaseView.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import Card from '@/components/Card.vue'


function onDecode(result) {
    console.log(result)
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
        onDecode(message)
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
                <ListItem text="Christopher Allis" />
            </List>
        </template>
    </BaseView>
</template>

<style scoped>

</style>