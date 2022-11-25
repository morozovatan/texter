<template>
  <div class="card">
    <TitleInput
      v-model="data.note.title"
      :editorIsActive = 'data.editorIsActive'
      @open="openEditor"
      @close="closeEditor"
    />
    <div class="editor-wrapper" :class="{ invisible: !data.editorIsActive }">
      <div class='bottom'>
        <Editor
          v-model="data.note.body"
        />
        <LabelList
        v-model="data.note.labels"
        @remove='removeLabel'
        />
        <div>
          <LabelInput 
            :placeholder = placeholders.labelsPlaceholder
            v-model="data.label"
            @pressedEnter="addLabel"/>
          <button class="btn-add" @click="addNewNote">←</button>
        </div>
      </div>
    </div> 

  </div>
</template>

<script setup>
import { useNoteStore } from '../stores/noteStorage'
import Editor from "./NoteFormEditor.vue"
import TitleInput from "./NoteFormTitleInput.vue"
import LabelList from "./NoteFormLabelList.vue"
import LabelInput from "./UI/NoteInput.vue"
import {reactive, watch} from 'vue'

const storage = useNoteStore()

const placeholders = {
  labelsPlaceholder: "Add labels maybe?"
}

let data = reactive({
  editorIsActive: false,
  label: "",
  currentId: 0,
  note: reactive({
    id: 0,
    title: "",
    body: "",
    labels: new Set(),
    isOpen: false,
  }),
})

    const openEditor = () => {
      data.editorIsActive = true
    }
    const closeEditor = () => {
      data.editorIsActive = false
    }
    const addLabel = () => {
      console.log(data.label)
      if (isSpaceValid(data.label)) {
        data.note.labels.add(data.label)
        data.label = ""
      }
    }
    const isSpaceValid = (s) => {
      if (s === "") return false
      if (s.trim() != "") return true
      return false;
    }
    const removeLabel = (label) => {
      data.note.labels.delete(label)
    }
    const addNewNote = () => {
      if (isSpaceValid(data.note.title) && isSpaceValid(data.note.body)) {
        if(data.note.id === 0){
          data.note.id = ++data.currentId
        }
        let newNote = {}
        Object.assign(newNote, data.note)
        newNote.labels = new Set(data.note.labels)
        if(storage.editedId > 0){
          storage.notes.splice(
            storage.notes.indexOf(
              storage.findNoteById(storage.editedId)
            ),
            1
          )
          storage.editedId = 0
        }
        storage.notes.push(newNote)
        data.note.title = ""
        data.note.body = ""
        data.note.id = 0
        data.note.labels.clear()
      }    
    }
    const editNote = watch(() => {
      if(storage.editedId > 0){
        openEditor()
        const editedNote = storage.findNoteById(storage.editedId) 
        Object.assign(data.note, editedNote)
        data.note.labels = new Set(editedNote.labels)
      }
    })
</script>

<style scoped>
.card {
  min-height: 100px;
  display: flex;
  flex-shrink: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #f6eddb;
  border-bottom: 1px solid black;
}
body .card .editor-wrapper {
  width: 80%;
  position: relative;
}
.card .editor-wrapper .bottom {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.card .editor-wrapper .bottom div {
  display: flex;
  justify-content: space-between;
}
.card .editor-wrapper .bottom div .btn-add {
  width: 13rem;
  height: 3rem;
  border: 1px solid black;
}
</style>