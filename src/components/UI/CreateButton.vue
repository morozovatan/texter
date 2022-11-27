<template>
    <button @click.stop="$emit('buttonClicked')">
        <slot></slot>
    </button>
</template>

<script setup>
    defineEmits(['buttonClicked'])
</script>

<style scoped>
button{
    width: 13rem;
    height: 3rem;
    border: 1px solid black;
}
</style>