<template>
    <button @click="$emit('buttonClicked')">
        <slot></slot>
    </button>
</template>

<script setup>
    defineEmits(['buttonClicked'])
</script>

<style scoped>
button{
    width: 10%;
    border: 1px solid black;
    border-left: 0;
    font-size: 1.2rem;
}
</style>