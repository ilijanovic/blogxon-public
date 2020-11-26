<template>
  <div class="flex flex-wrap relative mb-5 border rounded-md shadow-md">
    <transition name="popup">
      <menuBox :_id="blog._id" @blur.native="menu = false" v-if="menu" />
    </transition>
    <div class="h-32 w-32">
      <picture>
        <source :srcset="blog.thumbnail_webp" type="image/webp" />
        <img
          class="rounded-md border-r border-r-2 rounded-r-none"
          :src="blog.thumbnail"
          type="image/png"
        />
      </picture>
    </div>
    <div class="p-3 text-gray-600">
      <h1 class="text-lg mb-3">{{ blog.title }}</h1>
      <div>
        <div class="flex justify-between">
          <p class="mr-5"><b>ID:</b> {{ blog._id }}</p>
          <p><b>Slug:</b> {{ blog.slug }}</p>
        </div>
        <p><b>Description:</b> {{ blog.description }}</p>
      </div>
    </div>
    <div class="flex justify-between items-center p-3 flex-col ml-auto">
      <div
        @click="menu = true"
        class="p-2 transition:bg duration-200 text-gray-600 rounded-full cursor-pointer hover:bg-gray-200"
      >
        <MoreVerticalIcon />
      </div>
      <div class="flex justify-between items-center">
        <small class="mr-3 text-lg text-gray-600">{{ blog.views }}</small>
        <EyeIcon class="text-gray-600" />
      </div>
    </div>
  </div>
</template>
<script>
import { MoreVerticalIcon, EyeIcon } from 'vue-feather-icons'
import menuBox from '@/components/dashboard/blogCard/menu'
export default {
  props: ['blog'],
  data() {
    return {
      menu: false,
    }
  },
  components: {
    MoreVerticalIcon,
    menuBox,
    EyeIcon,
  },
}
</script>
