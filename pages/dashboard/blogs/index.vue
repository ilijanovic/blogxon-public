<template>
  <div>
    <h1 class="text-xl my-3">Blogs</h1>
    <div class="flex justify-between mb-5">
      <primary @click.native="$router.go(-1)">go back</primary>
      <NuxtLink to="/dashboard/blogs/createPost">
        <primary>Create new post</primary>
      </NuxtLink>
    </div>
    <transition mode="out-in" name="popup">
      <contentLoader v-if="$fetchState.pending" />
      <notFound v-if="!blogs.length && loaded" message="No blogs found" />
      <div v-if="blogs.length && loaded">
        <blogCard v-for="blog in blogs" :blog="blog" :key="blog._id" />
      </div>
    </transition>
  </div>
</template>
<script>
import contentLoader from '@/components/dashboard/loader/contentLoader'
import notFound from '@/components/dashboard/notFound'
import primary from '@/components/dashboard/button/primary'
import spinner from '@/components/dashboard/loader/spinner'
import blogCard from '@/components/dashboard/blogCard'
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: 'Dashboard blogs',
    }
  },
  computed: {
    ...mapGetters({
      blogs: 'dashboard/blogs',
    }),
  },
  async fetch() {
    try {
      let blogs = await this.$axios.$get('/api/internal/blogs')
      this.$store.commit('dashboard/SET_BLOGS', blogs)
      this.loaded = true
    } catch ({ response }) {
      this.$store.commit('dashboard/SET_ERROR_MESSAGE', response.data.message)
    }
  },
  data() {
    return {
      loaded: false,
    }
  },
  components: {
    spinner,
    blogCard,
    notFound,
    contentLoader,
  },
  layout: 'dashboard',
}
</script>
