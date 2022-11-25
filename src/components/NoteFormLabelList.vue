<template>
    <ul class="labels" v-if="modelValue.size !== 0">
          <li v-for="label in modelValue" :key="label">
            {{ label }}
            <button @click="$emit('remove',label)">×</button>
        </li>
        </ul>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Set,
    requires: true,
  }
})

defineEmits(['remove'])
</script>

<style scoped>
.labels {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
  padding-bottom: 0.5rem;
}
.labels li {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid rgb(167, 143, 118);
  border-radius: 0.4rem;
  background-color: #fff9ef;
  padding: 0.3rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1.2rem;
  font-style: italic;
  color: #5b462c;
}
.labels li button {
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #fff9ef;
  color: #5b462c;
}
</style>