<template>
  <div
    tabindex="0"
    ref="menubox"
    class="absolute right-0 focus:outline-none border shadow-md rounded-md top-0 w-40 m-5 bg-white"
  >
    <div
      @click="deleteUser"
      class="flex cursor-pointer hover:bg-gray-200 justify-between items-center p-2"
    >
      <p>Delete</p>
      <TrashIcon size="1.2x" />
    </div>
  </div>
</template>
<script>
import { EditIcon, TrashIcon } from 'vue-feather-icons'
export default {
  props: ['_id'],
  components: {
    EditIcon,
    TrashIcon,
  },
  methods: {
    async deleteUser() {
      try {
        await this.$axios.$post('/api/internal/deleteUser', {
          _id: this._id,
        })
        this.$store.commit('dashboard/REMOVE_USER', this._id)
      } catch ({ response }) {
        this.$store.commit('dashboard/SET_ERROR_MESSAGE', response.data.message)
      }
      this.$el.blur()
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.menubox.focus()
    })
  },
}
</script>
