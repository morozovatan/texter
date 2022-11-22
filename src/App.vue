<template>
  <main-title/>
  <note-form/>
  <note-display/>
</template>

<script>
import MainTitle from "./components/MainTitle.vue";
import NoteForm from "./components/NoteForm.vue";
import NoteDisplay from "./components/NoteDisplay.vue";

export default {
  components: {
    MainTitle,
    NoteForm,
    NoteDisplay,
  },
};
</script>

<style>
@import './css/nullstyle.css';

body {
  font-size: 1.4rem;
  font-family: "Times New Roman", Times, Baskerville, Georgia, serif;
}
.invisible {
  display: none;
}
</style>
