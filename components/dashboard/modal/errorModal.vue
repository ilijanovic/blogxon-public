<template>
  <div @click="close" class="err">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['message'],
  created() {
    setTimeout(() => {
      this.close()
    }, 5000)
  },
  methods: {
    close() {
      this.$store.commit('dashboard/SET_ERROR_MESSAGE', '')
    },
  },
}
</script>

<style lang="scss" scoped>
.err {
  min-width: 300px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 0 10px -8px black;
  border: 1px solid #dadada;
  display: flex;
  padding: 15px;
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 1000;
  border-left: 5px solid red;
  cursor: pointer;
  p {
    margin: auto;
    font-size: 1em;
    color: red;
  }
}
</style>