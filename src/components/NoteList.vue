<template>
  <ul class="notes" v-if="searchedNotes.length !== 0">
    <li v-for="note in searchedNotes" :key="note.id">
      <div class="note-title" @click="openNote(note.id)">
        {{ note.title }}
        <ul class="note-labels" v-if="note.labels.size !== 0">
          <li
            v-for="label in note.labels"
            :key="label"
            @click="clickOnLabel(label, $event)"
          >
            ◦ {{ label }}
          </li>
        </ul>
        <button @click="removeNote(note.id)">×</button>
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

<script>
export default {
  props: {
    searchedNotes: {
      type: Array,
      required: true,
    },
    wantedValue: {
      type: String,
    },
  },
  methods: {
    openNote(id) {
      this.$emit("open", id);
    },
    removeNote(id) {
      this.$emit("remove", id);
    },
    clickOnLabel(label, event) {
      this.$emit("findbylabel", label, event);
    },
    editNote(id) {
      this.$emit("edit", id);
    },
  },
};
</script>
