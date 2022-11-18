<template>
  <div class="card">
    <div class="texter">
      <input
        :class="{ extended: editorIsActive }"
        type="text"
        :placeholder="titlePlaceholder"
        v-model="note.title"
        @keypress.enter="openEditor"
        @keyup.esc="closeEditor"
      />
      <button
        class="btn-open"
        :class="{ invisible: editorIsActive }"
        @click="openEditor"
      >
        ←
      </button>
      <button
        class="btn-close"
        :class="{ invisible: !editorIsActive }"
        @click="closeEditor"
      >
        ×
      </button>
    </div>
    <div class="editor" :class="{ invisible: !editorIsActive }">
      <editor
        id="note-body"
        :init="{
          menubar: false,
          toolbar:
            'undo redo | bold italic | alignleft aligncenter alignright alignjustify',
        }"
        :placeholder="editorPlaceholder"
        v-model="note.body"
        @keyup.esc="closeEditor"
      />

      <div class="bottom">
        <ul class="labels" v-if="note.labels.size !== 0">
          <li v-for="label in note.labels" :key="label">
            {{ label }}
            <button @click="removeLabel(label)">×</button>
          </li>
        </ul>
        <div>
          <input
            type="text"
            :placeholder="labelsPlaceholder"
            v-model="label"
            @keypress.enter="addLabel"
          />
          <button class="btn-add" @click="addNewNote">←</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor,
  },
  data: () => ({
    titlePlaceholder: "Enter the title...",
    editorPlaceholder: "... and body",
    labelsPlaceholder: "Add labels maybe?",
    editorIsActive: false,
    label: "",
    note: {
      id: 0,
      title: "",
      body: "",
      labels: new Set(),
      isOpen: false,
    },
  }),
  methods: {
    openEditor() {
      this.editorIsActive = true;
    },
    closeEditor() {
      this.editorIsActive = false;
    },
    addLabel() {
      if (this.isSpaceValid(this.label)) {
        this.note.labels.add(this.label);
        this.label = "";
      }
    },
    removeLabel(label) {
      this.note.labels.delete(label);
    },
    isSpaceValid(s) {
      if (s === "") return false;
      if (s.trim() != "") return true;
      return false;
    },
    addNewNote() {
      if (this.isSpaceValid(this.note.title) && this.note.body !== "") {
        this.$emit("add", this.note);
        this.note.title = "";
        this.note.body = "";
        this.note.labels.clear();
      }
    },
    editNote(title, body, labels) {
      this.openEditor();
      this.note.title = title;
      this.note.body = body;
      this.note.labels = labels;
    },
  },
};
</script>
