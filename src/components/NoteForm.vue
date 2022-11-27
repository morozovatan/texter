<template>
  <div class="card">
    <div class="input-wrapper">
      <TitleInput
      v-model="data.note.title"
      :modelPlaceholder="placeholders.titlePlaceholder"
      :isToggled = "data.editorIsActive"
      :buttonClass= "buttonClass"
      :inputClass = 'inputClass'
      @toggle="toggleEditor">
        <template #toggled>
          <span>×</span>
        </template>
        <template #not-toggled>
          <span>←</span>
        </template>
      </TitleInput>
    </div>
    
    <div class="editor-wrapper" :class="{ invisible: !data.editorIsActive }">
      <div class='bottom'>
        <Editor v-model="data.note.body"/>
        <LabelList
        v-model="data.note.labels"
        @remove='removeLabel'
        v-slot="props">
        <button class="labelCross" @click="removeLabel(props.clickedLabel)">×</button>
        </LabelList>
        <div>
          <LabelInput 
            :placeholder = placeholders.labelsPlaceholder
            v-model="data.label"
            @pressedEnter="addLabel"/>
          <create-button @buttonClicked="addNewNote">←</create-button>  
        </div>
      </div>
    </div> 

  </div>
</template>

<script setup>
import { useNoteStore } from '../stores/noteStorage'
import Editor from "./NoteFormEditor.vue"
import TitleInput from "./UI/ToggleInput.vue"
import LabelList from "./NoteFormLabelList.vue"
import LabelInput from "./UI/NoteInput.vue"
import CreateButton from "./UI/CreateButton.vue"
import {reactive, watch, computed} from 'vue'

const storage = useNoteStore()

const placeholders = {
  labelsPlaceholder: "Add labels maybe?",
  titlePlaceholder: "Enter the title...",
}

const buttonClass = computed(() => {
  return {'narrow': data.editorIsActive
}})
const inputClass = computed(() => {
  return {'extended': data.editorIsActive
}})

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

    const toggleEditor = () => {
      data.editorIsActive = !data.editorIsActive
    }
    const addLabel = () => {
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
      console.log(label)
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
        data.editorIsActive = true
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
.input-wrapper {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
}
.editor-wrapper {
  width: 80%;
  position: relative;
}
.editor-wrapper .bottom {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.editor-wrapper .bottom div {
  display: flex;
  justify-content: space-between;
}
.labelCross {
  font-size: 1.2rem;
  font-weight: bold;
  color: #5b462c;
  background-color: transparent;
}
</style>