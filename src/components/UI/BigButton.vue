<template>
    <button @click.stop="$emit('buttonClicked')">
        <slot></slot>
    </button>
</template>

<script setup>
    defineEmits(['buttonClicked'])
</script>

<style scoped>
button {
  font-size: 3rem;
  min-width: 5rem;
  height: 100%;
  border-left: 1px solid black;
} 
</style>