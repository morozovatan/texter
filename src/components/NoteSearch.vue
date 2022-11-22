<template>
    <div class="search">
    <input type="text" :placeholder="searchPlaceholder" v-model="storage.wantedValue" />
    <button class="btn-search" @click="storage.toggleSearch">
      <span v-if="storage.searchByLabel">label</span>
      <span v-else>text</span>
    </button>
  </div>
</template>

<script>
import { useNoteStore } from '../stores/noteStorage'

export default({
    setup() {
        const storage = useNoteStore()
        const searchPlaceholder = "Looking for something by..."

        return{
            storage,
            searchPlaceholder,
        }
    },
})
</script>

<style scoped>
    .search {
        display: flex;
        justify-content: right;
    }
    .search input {
        font-size: 1.2rem;
        font-style: italic;
        padding-left: 0.5rem;
        border: 1px solid black;
        border-top: 0;
        width: 25%;
        height: 2rem;
    }
    .search .btn-search {
        border: 1px solid black;
        border-left: 0;
        border-top: 0;
        height: 2rem;
        width: 4rem;
        font-size: 1.2rem;
    }
    .search .btn-search img {
        width: 70%;
        height: 70%;
    }
</style>