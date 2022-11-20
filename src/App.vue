<template>
  <main-title></main-title>
  <note-form ref="noteForm" :editorIsActive="editorIsActive" @add="addNewNote" />
  <div class="search">
    <input type="text" :placeholder="searchPlaceholder" v-model="wantedValue" />
    <button class="btn-search" @click="toggleSearch">
      <span v-if="searchByLabel">label</span>
      <span v-else>text</span>
    </button>
  </div>
  <note-display
    :searchedNotes="searchedNotes"
    :notes="notes"
    :wantedValue="wantedValue"
    @remove="removeNote"
    @open="openNote"
    @findbylabel="clickOnLabel"
    @edit="editNote"
  />
</template>

<script>
import MainTitle from "./components/MainTitle.vue";
import NoteForm from "./components/NoteForm.vue";
import NoteDisplay from "./components/NoteDisplay.vue";
export default {
  components: {
    MainTitle,
    NoteForm,
    NoteDisplay,
  },
  data: () => ({
    notes: [],
    currentId: 0,
    searchPlaceholder: "Looking for something by...",
    wantedValue: "",
    searchByLabel: false,
    editorIsActive: false,
  }),
  methods: {
    addNewNote(note) {
      this.currentId++;
      note.id = this.currentId;
      let newNote = {};
      Object.assign(newNote, note);
      newNote.labels = new Set(note.labels);
      this.notes.push(newNote);
    },
    toggleSearch() {
      this.searchByLabel = !this.searchByLabel;
    },
    editNote(id) {
      let currentNote = this.notes.find((note) => note.id === id);
      this.$refs.noteForm.editNote(
        currentNote.title,
        currentNote.body,
        new Set(currentNote.labels)
      );
      this.removeNote(id);
    },
    removeNote(id) {
      this.notes.splice(
        this.notes.findIndex((note) => note.id === id),
        1
      );
    },
    clickOnLabel(label, event) {
      event.stopPropagation();
      this.searchByLabel = true;
      this.wantedValue = label;
    },
    openNote(id) {
      this.notes.find((note) => note.id === id).isOpen = !this.notes.find(
        (note) => note.id === id
      ).isOpen;
    },
  },
  computed: {
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
};
</script>

<style>
@import './css/nullstyle.css';

body {
  font-size: 1.4rem;
  font-family: "Times New Roman", Times, Baskerville, Georgia, serif;
}
.invisible {
  display: none;
}
/* search */
.search {
  display: flex;
  justify-content: right;
}
.search input {
  font-size: 1.2rem;
  font-style: italic;
  padding-left: 0.5rem;
  border: 1px solid black;
  border-top: 0;
  width: 25%;
  height: 2rem;
}
.search .btn-search {
  border: 1px solid black;
  border-left: 0;
  border-top: 0;
  height: 2rem;
  width: 4rem;
  font-size: 1.2rem;
}
.search .btn-search img {
  width: 70%;
  height: 70%;
}
</style>
