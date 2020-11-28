<template>
  <div class="blog my-10 mx-auto max-w-xl" v-html="$md.render(content)"></div>
</template>

<script>
export default {
  async asyncData({ $blogxon, route }) {
    let slug = route.params.slug
    let blog = await $blogxon.getBlogBySlug(slug)
    let content = blog.content

    return { content }
  },
}
</script>
<style lang="scss">
.blog {
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.6em;
  }
  h3 {
    font-size: 1.2em;
  }
  h4 {
    font-size: 0.8em;
  }
}
</style>