import { defineStore } from "pinia";

export const useNoteStore = defineStore({
    id:"storage",
    state:()=>({
        notes: [],
        wantedValue: '',
        searchByLabel: false,
        editedId: 0,
    }),
    getters:{
        searchedNotes() {
            if (this.wantedValue !== "") {
              if (this.searchByLabel) {
                return this.notes.filter((note) => note.labels.has(this.wantedValue));
              }
              return this.notes.filter(
                (note) =>
                  note.title.includes(this.wantedValue) ||
                  note.body.includes(this.wantedValue)
              );
            }
            return this.notes;
        },
    },
    actions:{
        toggleSearch() {
            this.searchByLabel = !this.searchByLabel;
        },
        clickOnLabel(label) {
            this.searchByLabel = true;
            this.wantedValue = label;
        },
        findNoteById(id){
           return this.notes.find((note) => note.id === id)
        }
    }
})