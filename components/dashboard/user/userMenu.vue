<template>
  <div tabindex="0" ref="menubox" class="options">
    <div @click="deleteUser" class="option">
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
<style lang="scss" scoped>
.options {
  right: 10px;
  top: 15px;
  position: absolute;
  min-width: 150px;
  z-index: 1;
  border: 1px solid #dadada;
  .option {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: white;
    cursor: pointer;
    &:hover {
      background: #f5f6fa;
    }
  }
}
</style>
