<template>
  <MainTitle/>
  <NoteForm/>
  <NoteDisplay/>
</template>

<script setup>
import MainTitle from "./components/TheMainTitle.vue";
import NoteForm from "./components/TheForm.vue";
import NoteDisplay from "./components/TheDisplay.vue";
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
