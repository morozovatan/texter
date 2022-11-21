import { defineStore, storeToRefs } from "pinia";

export const useNoteStore = defineStore({
    id:"store",
    state:()=>({
        notes: []
    }),
    getters:{},
    actions:{}
})