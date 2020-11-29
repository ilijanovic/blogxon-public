<template>
  <div class="max-w-screen-md mx-auto my-20 p-4">
    <h1>Blogxon blog system</h1>
    <div class="flex justify-between my-5">
      <nuxt-link to="/admin">
        <primary>Admin</primary>
      </nuxt-link>
      <primary @click.native="subscribe">Subscribe to push</primary>
    </div>
    <div class="flex max-w-md flex-wrap">
      <div
        class="flex-col mr-5 max-w-20 justify-between flex shadow-md flex-1 mx-auto my-5 rounded-md border p-4"
        v-for="blog in blogs"
        :key="blog._id"
      >
        <img class="border-b" :src="blog.thumbnail" alt="" />
        <div>
          <h1 class="text-xl my-5">{{ blog.title }}</h1>
          <p class="my-5">{{ blog.description }}</p>
        </div>
        <div class="flex flex-wrap">
          <p
            class="mr-1 mb-1 bg-gray-700 text-gray-100 border rounded-md p-1"
            v-for="keyword in blog.keywords"
            :key="keyword"
          >
            {{ keyword }}
          </p>
        </div>
        <div class="flex items-center my-1 justify-between">
          <p>{{ formatDate(blog.created) }}</p>
          <NuxtLink :to="'/blog/' + blog.slug">
            <primary>Read</primary>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import primary from '@/components/dashboard/button/primary'
export default {
  async asyncData({ $blogxon }) {
    let blogs = await $blogxon.getBlogs()
    return { blogs }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    async subscribe() {
      try {
        let granted = await this.$blogxon.askPermission()
        if (granted) {
          await this.$blogxon.subscribe()
          alert('subscribed')
        }
      } catch (err) {
        console.log(err)
        alert('something went wrong')
      }
    },
  },
}
</script>


