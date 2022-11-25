<template>
    <div class="texter">
      <SimpleInput
        :class="{ extended: editorIsActive }"
        :placeholder="titlePlaceholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @pressedEnter="$emit('open')"
      />
      <NoteButton
        :class="{ invisible: editorIsActive }"
        @buttonClicked = "$emit('open')">
        ←
      </NoteButton>
      <NoteButton
        :class="{ invisible: !editorIsActive }"
        style="width: 3%;"
        @buttonClicked = "$emit('close')">
        ×
      </NoteButton>
    </div>
</template>

<script setup>
import NoteButton from './UI/NoteButton.vue'
import SimpleInput from "./UI/NoteInput.vue"

defineProps({
  modelValue: {
    type: String,
  },
  editorIsActive: {
    type: Boolean,
  }
});

const titlePlaceholder = "Enter the title..."

defineEmits(['update:modelValue', 'open','close'])
</script>

<style scoped>
.texter {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
}
.extended {
  width: 77%;
}
</style>