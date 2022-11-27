<template>
  <div class="search-wrapper">
    <SearchInput
    v-model="storage.wantedValue"
    :modelPlaceholder="searchPlaceholder"
    :isToggled = "storage.searchByLabel"
    @toggle="storage.toggleSearch">
      <template v-slot:toggled>
        <span>label</span>
      </template>
      <template v-slot:not-toggled>
        <span>text</span>
      </template>
    </SearchInput>
  </div>
  <NoteList/>
</template>

<script setup>
import NoteList from "./NoteDisplayNoteList.vue";
import SearchInput from "./UI/ToggleInput.vue"
import { useNoteStore } from '../stores/noteStorage'

const storage = useNoteStore()
const searchPlaceholder = "Looking for something by..."
</script>

<style scoped>
.search-wrapper {
  display: flex;
  justify-content: right;
}
</style>

