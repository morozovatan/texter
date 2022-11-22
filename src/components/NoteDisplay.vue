<template>
  <note-search/>
  <note-list/>
</template>

<script>
import NoteSearch from "./NoteSearch.vue";
import NoteList from "./NoteList.vue";

export default {
   components: {
    NoteSearch,
    NoteList,
  },
};
</script>

