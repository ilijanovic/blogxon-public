<template>
  <div class="max-w-screen-md mx-auto my-20">
    <h1>Blogxon blog system</h1>
    <div class="flex flex-wrap">
      <div
        class="shadow-md flex-1 mr-5 mb-5 rounded-md border p-4"
        v-for="blog in blogs"
        :key="blog._id"
      >
        <img :src="blog.thumbnail" alt="" />
        <h1 class="text-xl my-5">{{ blog.title }}</h1>
        <p>{{ blog.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let blogs = await $axios.$get('/api/getBlogs')
    return { blogs }
  },
}
</script>


