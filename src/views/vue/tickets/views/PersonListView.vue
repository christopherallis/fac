<script setup>

import { inject, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import BaseView from '@/components/BaseView.vue'
import ComputedTable from '@/components/ComputedTable.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import ActionButton from '@/components/ActionButton.vue'
import TextInput from '@/components/TextInput.vue'

import { state } from '../scanstate.js'

const eventbus = inject('eventbus')
const router = useRouter()

const scanModeActive = ref(false)
const searchModeActive = ref(false)
const searchTerms = ref("")

function onRowClicked(personInfo) {
    if (scanModeActive.value) {
        // select person
    } else {
        state.personInfo = personInfo
        router.push(`/person/${personInfo.id}`)
    }
}

const tableHeader = ref({
    "name": {name:"Name", width: "200px"},
    "id": {name:"ID", width: ""}
})
const personList = ref([
    {"name":"Christopher Allis", "id":0},
    {"name":"Sandy Hanna", "id": 1}
])

const searchTermsComputed = computed(() => {
    if (searchModeActive.value) return searchTerms.value
    else return ""
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
            <ComputedTable :header="tableHeader" :tableData="personList" :search="searchTermsComputed" searchProp="name"  @rowClicked="onRowClicked" />
        </template>
    </BaseView>
</template>

<style scoped>

</style>