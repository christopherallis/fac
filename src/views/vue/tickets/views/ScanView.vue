<script setup>

import { onMounted, onUnmounted, ref, inject, computed } from 'vue'
import { useRouter } from 'vue-router'
//import { StreamBarcodeReader } from 'vue-barcode-reader'

import BaseView from '@/components/BaseView.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import ComputedTable from '../../components/ComputedTable.vue'
import Card from '@/components/Card.vue'
import ActionButton from '@/components/ActionButton.vue'


const axios = inject('axios')
const router = useRouter()
const eventId = ref(router.currentRoute.value.params.id)


const history = ref([])

const tableHeader = ref({
    "id": {name:"ID", width: ""},
    "name": {name:"Name"},
    "agegroup": {name: "Age Group"}
})


const computedHistory = computed(() => {
    let newList = []
    for (let index in history.value) {
        let x = {...history.value[index]}
        x.name = x.firstname+" "+x.lastname
        newList.unshift(x)
    }
    return newList
})

function onDecode(result) {
    axios.post("/api/ticket/consume", {
        eventid: router.currentRoute.value.params.id,
        uuid: result,
    }).then((response) => {
        if (response.data.success) {
            history.value.push({...response.data.person, "_class":"success"})
        } else {
            history.value.push({...response.data.person, "_class":"fail"})
        }
            
    }).catch((error) => {
        console.log("Not Found")
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

function openManualScan(){
    router.push('/event/'+router.currentRoute.value.params.id+'/mscan')
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
        <template #actions>
            <ActionButton icon="list" :onPress="openManualScan" />
        </template>
        <template #content>
            <Card center="true">
                <div>Scanning...</div>
            </Card>

            <ComputedTable :header="tableHeader" :data="computedHistory" />
        </template>
    </BaseView>
</template>

<style scoped>

</style>