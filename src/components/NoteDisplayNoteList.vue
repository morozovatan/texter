<template>
    <ul class="notes" v-if="storage.notes.length !== 0">
    <li v-for="note in storage.searchedNotes" :key="note.id">
      <div class="note-title" @click="openNote(note.id)">
        {{ note.title }}
        <ul class="note-labels" v-if="note.labels.size !== 0">
          <li
            v-for="label in note.labels"
            :key="label"
            @click.stop="storage.clickOnLabel(label)"
          >
            ◦ {{ label }}
          </li>
        </ul>
        <button @click.stop="removeNote(note)">×</button>
      </div>
      <div class="note-body" v-if="note.isOpen">
        <span v-html="note.body"></span>
        <button @click="editNote(note.id)">
          <img src="..\..\public\img\pencil.svg" alt="" />
        </button>
      </div>
    </li>
  </ul>
  <div v-else>no notes yet...</div>
</template>

<script setup>
    import { useNoteStore } from '../stores/noteStorage'
    const storage = useNoteStore()

    const openNote = (id) => {
      storage.notes.find((note) => note.id === id).isOpen = !storage.notes.find(
        (note) => note.id === id
      ).isOpen;
    }
    const removeNote = (note) => {
      // storage.notes.splice(
      //   storage.notes.findIndex((note) => note.id === id), 1
      //   )
      storage.notes.splice(note,1)
    }
    const editNote = (id) => {
      storage.editedId = id
    }
</script>

<style scoped>
.notes {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.notes li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.notes li .note-title {
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
.notes li .note-title .note-labels {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
}
.notes li .note-title .note-labels li {
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
.notes li .note-title button {
  font-size: 3rem;
  min-width: 5rem;
  height: 100%;
  border-left: 1px solid black;
}
.notes li .note-body {
  position: relative;
  min-height: 5rem;
  padding: 1rem;
  border: 1px solid black;
  border-top: 0;
  width: 80%;
  background-color: #faf5eb;
}
.notes li .note-body button {
  font-size: 3rem;
  width: 5rem;
  height: 5rem;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  position: absolute;
  right: 0;
  top: 0;
}
.notes li .note-body button img {
  height: 2.5rem;
  padding-top: 1rem;
}
</style>
