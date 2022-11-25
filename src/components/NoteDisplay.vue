<template>
  <note-search/>
  <note-list/>
</template>

<script>
import NoteSearch from "./NoteDisplaySearch.vue";
import NoteList from "./NoteDisplayNoteList.vue";

export default {
   components: {
    NoteSearch,
    NoteList,
  },
};
</script>

