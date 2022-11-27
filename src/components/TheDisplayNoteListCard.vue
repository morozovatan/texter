<template>
<div class="note">
  <div class="note-title" @click="$emit('open',note.id)">
    {{ note.title }}
    <LabelList class="note-labels" v-model="note.labels" @labelClicked="$emit('labelClicked',$event)"/>
    <BigButton @buttonClicked="$emit('remove',note)">×</BigButton>
  </div>
  <div class="note-body" v-if="note.isOpen">
    <span v-html="note.body"></span>
    <BigButton @buttonClicked="$emit('edit',note.id)">
      <img src="..\..\public\img\pencil.svg" alt="" />
    </BigButton>
  </div>
</div>
</template>

<script setup>
  import LabelList from './LabelList.vue'
  import BigButton from './UI/BigButton.vue'

  defineProps({
    note: Object,
    required: true,
  })
  
  defineEmits(['open','remove','labelClicked',])
</script>

<style scoped>

.note div{
  padding-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  border: 1px solid black;
  width: 80%;
}
.note-title {
  background-color: white;
  gap: 1rem;
  margin-top: 1rem;
}
.note-body {
  background-color: #faf5eb;
  border-top: 0;
}
.note-title .note-labels {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
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