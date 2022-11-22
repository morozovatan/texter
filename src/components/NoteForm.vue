<template>
  <div class="card">
    <div class="texter">
      <input
        type="text"
        :class="{ extended: data.editorIsActive }"
        :placeholder="placeholders.titlePlaceholder"
        v-model="data.note.title"
        @keypress.enter="openEditor"
        @keyup.esc="closeEditor"
      />
      <button
        class="btn-open"
        :class="{ invisible: data.editorIsActive }"
        @click="openEditor"
      >
        ←
      </button>
      <button
        class="btn-close"
        :class="{ invisible: !data.editorIsActive }"
        @click="closeEditor"
      >
        ×
      </button>
    </div>

    <div class="editor" :class="{ invisible: !data.editorIsActive }">
      <editor
        id="note-body"
        :init="{
          menubar: false,
          toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright alignjustify',
        }"
        :placeholder="placeholders.editorPlaceholder"
        v-model="data.note.body"
        @keyup.esc="closeEditor"
      />
      <div class='bottom'>
        <ul class="labels" v-if="data.note.labels.size !== 0">
          <li v-for="label in data.note.labels" :key="label">
            {{ label }}
            <button @click="removeLabel(label)">×</button>
        </li>
        </ul>
        <div>
          <input
            type="text"
            :placeholder="placeholders.labelsPlaceholder"
            v-model="data.label"
            @keypress.enter="addLabel"
          />
          <button class="btn-add" @click="addNewNote">←</button>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { useNoteStore } from '../stores/noteStorage'
import Editor from "@tinymce/tinymce-vue"
import {reactive, watch} from 'vue'

export default {
  components: {
    editor: Editor,
  },
  setup(){
    const storage = useNoteStore()
    const placeholders = {
      titlePlaceholder: "Enter the title...",
      editorPlaceholder: "... and body",
      labelsPlaceholder: "Add labels maybe?",
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
    const addLabel= () => {
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

    return{
      data,
      storage,
      placeholders,

      openEditor,
      closeEditor,
      addLabel,
      removeLabel,
      addNewNote,
      editNote,
    }
  },
};
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

.card .texter {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
}
.card .texter .btn-close {
  font-size: 1.5rem;
  border: 1px solid black;
  border-left: 0;
  border-bottom: 0;
  width: 3%;
}
.card .texter .btn-open {
  width: 10%;
  border: 1px solid black;
  border-left: 0;
}
.card .texter input {
  font-size: 1.2rem;
  font-style: italic;
  padding-left: 0.5rem;
  border: 1px solid black;
  width: 25%;
  height: 2rem;
}
.card .texter .extended {
  width: 77%;
  border-bottom: 0;
}
body .card .editor {
  width: 80%;
  position: relative;
}
.card .editor textarea {
  font-size: 100%;
  padding-left: 1rem;
  width: 100%;
  border: 1px solid black;
  height: 20rem;
}
.card .editor .bottom {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.card .editor .bottom .labels {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
}
.card .editor .bottom .labels li {
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
.card .editor .bottom .labels li button {
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #fff9ef;
  color: #5b462c;
}
.card .editor .bottom div {
  display: flex;
  justify-content: space-between;
}
.card .editor .bottom div input {
  display: flex;
  font-size: 1.2rem;
  font-style: italic;
  padding-left: 0.5rem;
  border: 1px solid black;
  width: 25%;
  height: 2rem;
}
.card .editor .bottom div .btn-add {
  width: 13rem;
  height: 3rem;
  border: 1px solid black;
}
</style>