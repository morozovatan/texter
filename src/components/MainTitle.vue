<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: "Texter",
  }),
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  background: #f6eddb;
}
h1 {
  background: white;
  font-size: 3rem;
  font-weight: bold;
}
</style>