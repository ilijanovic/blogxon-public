<template>
  <div :class="{ disabled }" class="email">
    <p>{{ email.email }}</p>
    <p>{{ formatDate(email.created) }}</p>
    <div class="icons">
      <div @click="deleteEmail(email._id)" class="icon">
        <TrashIcon style="color: red" />
      </div>
    </div>
  </div>
</template>
<script>
import { TrashIcon, SendIcon } from 'vue-feather-icons'
export default {
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    async deleteEmail(id) {
      this.disabled = true
      try {
        await this.$axios.$post('/api/internal/deleteEmail', {
          id,
        })
        this.$emit('delete', id)
      } catch (err) {
        this.disabled = false
      }
    },
  },
  data() {
    return {
      disabled: false,
    }
  },
  components: {
    TrashIcon,
    SendIcon,
  },
  props: ['email'],
}
</script>
<style lang="scss" scoped>
.email {
  border-radius: 6px;
  border: 1px solid #dadada;
  margin: 20px 0;
  box-shadow: 0 0 10px -8px black;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: wrap;
  p {
    margin: 10px 0;
  }
  .icons {
    display: flex;
    align-items: center;
    .icon {
      margin-left: 20px;
      padding: 8px;
      cursor: pointer;
      border-radius: 6px;
    }
  }
}
.disabled {
  background: lightgrey !important;
  color: grey !important;
  pointer-events: none;
  border-color: lightgrey;
}
</style>
