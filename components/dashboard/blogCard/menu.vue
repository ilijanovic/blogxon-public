<template>
  <div
    tabindex="0"
    ref="menubox"
    class="bg-white shadow-md border rounded-md focus:outline-none w-40 absolute top-0 right-0 m-4"
  >
    <div
      @click="updatePost"
      class="flex justify-between items-center hover:bg-gray-200 cursor-pointer p-3"
    >
      <p>Edit</p>
      <EditIcon size="1.2x" />
    </div>
    <div
      @click="deletePost"
      class="flex justify-between items-center hover:bg-gray-200 cursor-pointer p-3"
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
    updatePost() {
      this.$router.push('/dashboard/blogs/updatePost/' + this._id)
    },
    async deletePost() {
      try {
        await this.$axios.$post('/api/internal/deleteBlog', {
          _id: this._id,
        })
        this.$store.commit('dashboard/REMOVE_BLOG', this._id)
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
