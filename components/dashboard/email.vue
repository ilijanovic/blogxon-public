<template>
  <div
    :class="{ disabled }"
    class="flex justify-between items-center p-5 border shadow-md rounded-md"
  >
    <p>{{ email.email }}</p>
    <p>{{ formatDate(email.created) }}</p>
    <div>
      <div @click="deleteEmail(email._id)">
        <TrashIcon
          size="2.2x"
          class="cursor-pointer text-red-600 p-2 transition:bg duration-300 rounded-full active:bg-red-300 hover:bg-red-200"
        />
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
.disabled {
  background: lightgrey !important;
  color: grey !important;
  pointer-events: none;
  border-color: lightgrey;
}
</style>
