<template>
    <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keypress.enter="$emit('pressedEnter')"
    />
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
  },
  editorIsActive: {
    type: Boolean,
  }
});

defineEmits(['update:modelValue', 'pressedEnter'])
</script>

<style scoped>
input {
  font-size: 1.2rem;
  font-style: italic;
  padding-left: 0.5rem;
  border: 1px solid black;
  width: 25%;
  height: 2rem;
}
</style>