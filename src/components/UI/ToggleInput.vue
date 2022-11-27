<template>
  <SimpleInput
    :class="inputClass"
    :placeholder = "modelPlaceholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <SmallButton :class = "buttonClass"
    @buttonClicked = "$emit('toggle')">
    <span v-if="isToggled">
      <slot name="toggled"></slot>  
    </span>
    <span v-else>
      <slot name="not-toggled"></slot> 
    </span>
  </SmallButton>
</template>

<script setup>
import SmallButton from './SmallButton.vue'
import SimpleInput from "./SimpleInput.vue"

defineProps({
  modelValue: {
    type: String,
  },
  modelPlaceholder: {
    type: String,
  },
  isToggled: {
    type: Boolean,
  },
  buttonClass:{
    type: Object,
  },
  inputClass:{
    type: Object,
  },
});

defineEmits(['update:modelValue', 'toggle'])
</script>

<style scoped>
.narrow{
  width: 3%;
}

.extended {
  width: 77%;
}
.search input{
  border-top: 0;
}
</style>