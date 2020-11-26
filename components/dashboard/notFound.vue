<template>
  <div class="notfound">
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  props: ['message'],
}
</script>
<style scoped>
.notfound {
  color: var(--dark);
  border-radius: 6px;
  padding: 30px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 10px -8px black;
  border: 1px solid #dadada;
  margin-top: 20px;
  font-size: 18px;
}
</style>