<template>
    <div class="texter">
      <input
        type="text"
        :class="{ extended: editorIsActive }"
        :placeholder="titlePlaceholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keypress.enter="$emit('open')"
        @keyup.esc="$emit('close')"
      />
      <button
        class="btn-open"
        :class="{ invisible: editorIsActive }"
        @click="$emit('open')"
      >
        ←
      </button>
      <button
        class="btn-close"
        :class="{ invisible: !editorIsActive }"
        @click="$emit('close')"
      >
        ×
      </button>
    </div>
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

const titlePlaceholder = "Enter the title..."

defineEmits(['update:modelValue', 'open','close'])
</script>

<style scoped>
  .card .texter {
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
}
.card .texter .btn-close {
  font-size: 1.5rem;
  border: 1px solid black;
  border-left: 0;
  border-bottom: 0;
  width: 3%;
}
.card .texter .btn-open {
  width: 10%;
  border: 1px solid black;
  border-left: 0;
}
.card .texter input {
  font-size: 1.2rem;
  font-style: italic;
  padding-left: 0.5rem;
  border: 1px solid black;
  width: 25%;
  height: 2rem;
}
.card .texter .extended {
  width: 77%;
  border-bottom: 0;
}
</style>