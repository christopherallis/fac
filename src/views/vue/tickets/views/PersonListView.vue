<script setup>

import { inject, ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import BaseView from '@/components/BaseView.vue'
import ComputedTable from '@/components/ComputedTable.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import ActionButton from '@/components/ActionButton.vue'
import TextInput from '@/components/TextInput.vue'

import { state } from '../scanstate.js'

const axios = inject('axios')
const eventbus = inject('eventbus')
const router = useRouter()

const scanModeActive = ref(false)
const searchModeActive = ref(false)
const searchTerms = ref("")

const selectedPersonId = ref(-1)

function onRowClicked(personInfo) {
    if (scanModeActive.value) {
        // select person
        console.log(personInfo.id)
        selectedPersonId.value = personInfo.id
    } else {
        state.personInfo = personInfo
        router.push(`/person/${personInfo.id}`)
    }
}

const tableHeader = ref({
    "name": {name:"Name", width: "300px"},
    "id": {name:"ID", width: ""}
})

const personList = ref([])

const searchTermsComputed = computed(() => {
    if (searchModeActive.value) return searchTerms.value
    else return ""
})

function getPersonList() {
    axios.get("/api/person/").then((response) => {
        personList.value = response.data
        console.log(response.data)
    })
}

getPersonList()

eventbus.on('list-update',(name) => {
    if (name == "person") {
        getPersonList()
    }
})

const computedPersonList = computed(() => {
    let newList = []
    for (let index in personList.value) {
        let x = {...personList.value[index]}
        x.name = x.firstname+" "+x.lastname
        newList.push(x)
    }
    newList.sort((a, b) =>  a.id-b.id)
    return newList
})

function onDecode(result) {
    console.log(result)
    if (selectedPersonId.value > -1) {
        axios.put("/api/person/"+selectedPersonId.value, {
            uuid: result
        }).then((response) => {
            // maybe update the user?
            // or go to next person
        })
    }
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
    <BaseView title="Persons">
        <template #actions>
            <ActionButton icon="search" :onPress="() => searchModeActive = !searchModeActive" :active="searchModeActive" />
            <ActionButton icon="qr_code_scanner" :onPress="() => scanModeActive = !scanModeActive" :active="scanModeActive" />
            <ActionButton icon="add" :onPress="() => eventbus.trigger('modal-open','create-person')" />
        </template>
        <template #content>
            <TextInput placeholder="Search..." v-model="searchTerms" v-show="searchModeActive" />
            <ComputedTable :header="tableHeader" :tableData="computedPersonList" :search="searchTermsComputed" searchProp="name" :select="selectedPersonId"  @rowClicked="onRowClicked" />
        </template>
    </BaseView>
</template>

<style scoped>

</style>