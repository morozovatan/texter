<template>
  <main-title></main-title>
  <top ref="top" :editorIsActive="editorIsActive" @add="addNewNote" />
  <div class="search">
    <input type="text" :placeholder="searchPlaceholder" v-model="wantedValue" />
    <button class="btn-search" @click="toggleSearch">
      <span v-if="searchByLabel">label</span>
      <span v-else>text</span>
    </button>
  </div>
  <note-list
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
import Top from "./components/Top.vue";
import NoteList from "./components/NoteList.vue";

export default {
  components: {
    MainTitle,
    Top,
    NoteList,
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
      this.$refs.top.editNote(
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
      console.log(label);
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
@charset "UTF-8";

/*Обнуление*/
* {
  padding: 0;
  margin: 0;
  border: 0;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

:focus,
:active {
  outline: none;
}

a:focus,
a:active {
  outline: none;
}

nav,
footer,
header,
aside {
  display: block;
}

html,
body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

input,
button,
textarea {
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}

button {
  cursor: pointer;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

a,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: 400;
}

/*--------------------*/

body {
  font-size: 1.4rem;
  font-family: "Times New Roman", Times, Baskerville, Georgia, serif;
}
body .card {
  min-height: 100px;
  display: flex;
  flex-shrink: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f6eddb;
  border-bottom: 1px solid black;
}

body .card .texter {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
}
body .card .texter .btn-close {
  font-size: 1.5rem;
  border: 1px solid black;
  border-left: 0;
  border-bottom: 0;
  width: 3%;
}
body .card .texter .btn-open {
  width: 10%;
  border: 1px solid black;
  border-left: 0;
}
body .card .texter input {
  font-size: 1.2rem;
  font-style: italic;
  padding-left: 0.5rem;
  border: 1px solid black;
  width: 25%;
  height: 2rem;
}
body .card .texter .extended {
  width: 77%;
  border-bottom: 0;
}
body .card .editor {
  width: 80%;
  position: relative;
}
body .card .editor textarea {
  font-size: 100%;
  padding-left: 1rem;
  width: 100%;
  border: 1px solid black;
  height: 20rem;
}
body .card .editor .bottom {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}
body .card .editor .bottom .labels {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
}
body .card .editor .bottom .labels li {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid rgb(167, 143, 118);
  border-radius: 0.4rem;
  background-color: #fff9ef;
  padding: 0.3rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1.2rem;
  font-style: italic;
  color: #5b462c;
}
body .card .editor .bottom .labels li button {
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #fff9ef;
  color: #5b462c;
}
body .card .editor .bottom div {
  display: flex;
  justify-content: space-between;
}
body .card .editor .bottom div input {
  display: flex;
  font-size: 1.2rem;
  font-style: italic;
  padding-left: 0.5rem;
  border: 1px solid black;
  width: 25%;
  height: 2rem;
}
body .card .editor .bottom div .btn-add {
  width: 13rem;
  height: 3rem;
  border: 1px solid black;
}
body .search {
  display: flex;
  justify-content: right;
}
body .search input {
  font-size: 1.2rem;
  font-style: italic;
  padding-left: 0.5rem;
  border: 1px solid black;
  border-top: 0;
  width: 25%;
  height: 2rem;
}
body .search .btn-search {
  border: 1px solid black;
  border-left: 0;
  border-top: 0;
  height: 2rem;
  width: 4rem;
  font-size: 1.2rem;
}
body .search .btn-search img {
  width: 70%;
  height: 70%;
}
body .notes {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
body .notes li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
body .notes li .note-title {
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  height: 5rem;
  width: 80%;
  border: 1px solid black;
  background-color: white;
}
body .notes li .note-title .note-labels {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
}
body .notes li .note-title .note-labels li {
  border: 1px solid rgb(167, 143, 118);
  border-radius: 0.4rem;
  background-color: #fff9ef;
  padding: 0.3rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1.2rem;
  font-style: italic;
  color: #5b462c;
}
body .notes li .note-title button {
  font-size: 3rem;
  min-width: 5rem;
  height: 100%;
  border-left: 1px solid black;
}
body .notes li .note-body {
  position: relative;
  min-height: 5rem;
  padding: 1rem;
  border: 1px solid black;
  border-top: 0;
  width: 80%;
  background-color: #faf5eb;
}
body .notes li .note-body button {
  font-size: 3rem;
  width: 5rem;
  height: 5rem;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  position: absolute;
  right: 0;
  top: 0;
}
body .notes li .note-body button img {
  height: 2.5rem;
  padding-top: 1rem;
}
body .invisible {
  display: none;
}
</style>
