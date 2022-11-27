<template>
  <ul class="notes" v-if="storage.notes.length !== 0">
    <Card class="note" v-for="note in storage.searchedNotes"
    :note="note"
    :key="note.id"
    @open="openNote"
    @edit="editNote"
    @remove="removeNote"
    @labelClicked="storage.clickOnLabel"
    />
  </ul>
  <div v-else>no notes yet...</div>
</template>

<script setup>
  import Card from './TheDisplayNoteListCard.vue' 
  import { useNoteStore } from '../stores/noteStorage'
  const storage = useNoteStore()

  const openNote = (id) => {
    storage.notes.find((note) => note.id === id).isOpen = !storage.notes.find(
      (note) => note.id === id).isOpen;
  }
  const removeNote = (note) => {
    storage.notes.splice(note,1)
  }
  const editNote = (id) => {
    storage.editedId = id
  }
</script>
