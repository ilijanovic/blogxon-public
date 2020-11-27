<template>
  <div class="max-w-screen-md mx-auto my-20 p-4">
    <h1>Blogxon blog system</h1>
    <nuxt-link to="/admin">
      <primary>Admin</primary>
    </nuxt-link>

    <primary @click.native="subscribe">Subscribe to push</primary>
    <div class="flex flex-wrap">
      <div
        class="flex-col mr-5 max-w-20 justify-between flex shadow-md flex-1 mx-auto my-5 rounded-md border p-4"
        v-for="blog in blogs"
        :key="blog._id"
      >
        <img :src="blog.thumbnail" alt="" />
        <div>
          <h1 class="text-xl my-5">{{ blog.title }}</h1>
          <p>{{ blog.description }}</p>
        </div>
        <div class="border rounded-md p-1">
          <p>{{ blog.author.name }}</p>
          <p>{{ blog.author.bio }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import primary from '@/components/dashboard/button/primary'
export default {
  async fetch() {
    this.blogs = await this.$blogxon.getBlogs()
  },
  data: () => ({ blogs: [] }),
  methods: {
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


