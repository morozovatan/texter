<template>
<div class="note">
  <div class="note-title" @click="$emit('open',note.id)">
        {{ note.title }}
        <LabelList class="note-labels" v-model="note.labels"/>
        <button @click.stop="$emit('remove',note)">×</button>
      </div>
      <div class="note-body" v-if="note.isOpen">
        <span v-html="note.body"></span>
        <button @click="$emit('edit',note.id)">
          <img src="..\..\public\img\pencil.svg" alt="" />
        </button>
      </div>
</div>
</template>

<script setup>
    import LabelList from './NoteFormLabelList.vue'

    defineProps({
        note: Object,
        required: true,
    })
</script>

<style scoped>
  .note-title {
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
.note-title .note-labels {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
}

.note-title button {
  font-size: 3rem;
  min-width: 5rem;
  height: 100%;
  border-left: 1px solid black;
}
.note-body {
  position: relative;
  min-height: 5rem;
  padding: 1rem;
  border: 1px solid black;
  border-top: 0;
  width: 80%;
  background-color: #faf5eb;
}
.note-body button {
  font-size: 3rem;
  width: 5rem;
  height: 5rem;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  position: absolute;
  right: 0;
  top: 0;
}
.note-body button img {
  height: 2.5rem;
  padding-top: 1rem;
}

.note {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>