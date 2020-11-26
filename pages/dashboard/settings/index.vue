<template>
  <div>
    <div
      class="flex justify-between items-center shadow-md rounded-md border p-5 mt-5"
    >
      <h2 class="text-xl">User</h2>
      <div>
        <NuxtLink to="/dashboard/settings/createUser">
          <primary>Create user</primary>
        </NuxtLink>
      </div>
    </div>

    <div class="flex flex-wrap">
      <userCard :user="user" v-for="user in users" :key="user._id" />
    </div>

    <authorEdit @refresh="$fetch()" :author="author" />
  </div>
</template>

<script>
import primary from '@/components/dashboard/button/primary'
import userCard from '@/components/dashboard/user/userCard'
import authorEdit from '@/components/dashboard/authorEdit'
import { mapGetters } from 'vuex'
export default {
  layout: 'dashboard',
  data() {
    return {
      author: {},
    }
  },
  components: {
    userCard,
    authorEdit,
  },
  async fetch() {
    try {
      let [users, author] = await Promise.all([
        this.$axios.$get('/api/internal/getUsers'),
        this.$axios.$get('/api/internal/getAuthor'),
      ])
      this.author = author
      this.$store.commit('dashboard/SET_USERS', users)
    } catch ({ response }) {
      this.$store.commit('dashboard/SET_ERROR_MESSAGE', response.data.message)
    }
  },
  computed: {
    ...mapGetters({
      users: 'dashboard/users',
    }),
  },
  head() {
    return {
      title: 'Settings',
    }
  },
}
</script>
