<template>
  <div class="statistics">
    <h1>Statistics</h1>
    <div class="stat">
      <p>Total views</p>
      <p>{{ statistics.views }}</p>
    </div>
    <div class="stat">
      <p>Total likes</p>
      <p>{{ statistics.likes }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['statistics'],
}
</script>
<style lang="scss" scoped>
.statistics {
  box-shadow: 0 0 10px -8px black;
  border: 1px solid #dadada;
  border-radius: 6px;
  padding: 10px;
  flex: 1;
  margin-bottom: 15px;
  .stat {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
  &:last-child {
    margin-right: 0;
  }
}
</style>
