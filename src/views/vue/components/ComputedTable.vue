<script setup>

import { ref, defineProps, defineEmits, onActivated, computed } from 'vue'

const props = defineProps(["header", "tableData", "title", "onPressFactory", "search", "searchProp", "select"])
const emits = defineEmits(["rowClicked"])

// Computes the tableData list while removing any item not found in header
const computedData = computed(() => {
    let newData = []
    for (const itemIndex in props.tableData) {
        const item = props.tableData[itemIndex]
        if (item[props.searchProp].toLowerCase().match(props.search.toLowerCase())) {
            let newRow = {}
            
            for (let key in props.header) {
                if (key in item) {
                    newRow[key] = item[key]
                }
            }
            newData.push(newRow)
        }
    }
    return newData
})


</script>

<template>
    <table>
        <!--<col v-for="(val, key) in props.header" :style="'width:'+val.width"/>-->
        <thead>
            <tr><th v-for="val in props.header" :key="val.name">{{ val.name }}</th></tr>
        </thead>
        <tbody>
            <tr v-for="item in computedData" :class="props.select == item.id ? 'selected' : ''" :key="item.id" @click="() => emits('rowClicked',item)">
                <td v-for="val in item" :key="val">{{ val }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 5px;
    }
    th {
        text-align: left;
        padding: 10px;
    }

    tbody tr td {
        background-color: var(--surface-color);
        color: var(--color);
        padding: 10px;
        border: solid 1px rgba(0, 0, 0, 0);
        border-style: solid none;
    }
    tbody tr td:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    tbody tr td:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    tbody tr {
        cursor: pointer;
    }
    tbody tr.selected td {
        background-color: var(--accent-color);
    }
</style>