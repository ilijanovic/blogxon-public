<template>
  <div
    class="flex p-5 border relative shadow-md rounded-md my-5 flex-1 justify-between items-center"
  >
    <transition name="popup">
      <menuEdit :_id="user._id" @blur.native="menu = false" v-if="menu" />
    </transition>
    <div
      class="relative w-20 h-20 border rounded-full flex items-center justify-center border-gray-500"
    >
      <picture v-if="user.image || user.image_webp">
        <img :src="user.image" type="image/png" />
        <source
          class="w-full h-full absolute left-0 top-0"
          :srcset="user.image_webp"
          type="image/webp"
        />
      </picture>
      <UserIcon class="text-gray-500" size="2.5x" />
    </div>
    <div class="mr-auto ml-5">
      <p>Name: {{ user.author.name }}</p>
      <p>Bio: {{ user.author.bio }}</p>
    </div>
    <div
      @click="menu = true"
      class="mb-auto cursor-pointer transition:bg duration-300 hover:bg-gray-200 rounded-full p-2"
    >
      <MoreVerticalIcon class="text-gray-500" />
    </div>
  </div>
</template>
<script>
import { UserIcon, MoreVerticalIcon } from 'vue-feather-icons'
import menuEdit from '@/components/dashboard/user/userMenu'
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
  components: {
    UserIcon,
    MoreVerticalIcon,
    menuEdit,
  },
  data() {
    return {
      menu: false,
    }
  },
}
</script>

