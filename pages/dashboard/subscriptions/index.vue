<template>
  <div>
    <h1 class="text-xl my-3">Subscriptions</h1>

    <primary @click.native="$router.go(-1)">go back</primary>

    <div class="mb-5 mt-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Title</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="login"
        v-model="notification.title"
      />
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Message</label>
      <textarea
        class="border p-3 resize-y w-full rounded-md focus:outline-none"
        v-model="notification.options.body"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
    </div>

    <label class="block mb-1 text-gray-700">Icon</label>
    <div class="flex flex-wrap">
      <div
        @click="selectThumbnail(i)"
        class="flex hover:bg-gray-100 border-4 w-24 h-24 items-center cursor-pointer mb-3 mr-3 rounded-md relative"
        v-for="(thumbnail, i) in thumbnails"
        :key="thumbnail"
        :class="{
          'border-green-600': selectedIcon === thumbnail,
        }"
      >
        <img class="bg-cover m-auto absolute" :src="thumbnail" />
      </div>
    </div>
    <label v-if="badges.length" class="block mb-1 text-gray-700"
      >Choose badge</label
    >

    <div class="flex flex-wrap">
      <div
        v-for="(badge, i) in badges"
        :key="badge.path"
        class="border-4 hover:bg-gray-100 w-24 h-24 cursor-pointer rounded-md relative mr-3 mb-3"
        :class="{ 'border-green-600': selectedBadge === badge.path }"
      >
        <transition name="popup">
          <XIcon
            v-if="selectedBadge === badge.path"
            @click="deleteBadge(badge._id)"
            class="absolute bg-red-600 text-red-200 top-0 rounded-md right-0 m-0.5"
          />
        </transition>
        <div class="flex items-center h-full" @click="selectBadge(i)">
          <img
            class="w-full rounded-md h-full object-cover"
            :src="badge.path"
          />
        </div>
      </div>
      <div
        class="border-4 overflow-hidden h-24 w-24 cursor-pointer rounded-md relative mr-3 mb-3"
      >
        <div
          class="cursor-pointer hover:bg-gray-100 flex h-full items-center justify-center"
        >
          <img @load="freeMemory" v-if="image" :src="image" />
          <input
            class="absolute top-0 left-0 cursor-pointer opacity-0 w-full h-full"
            v-if="!image"
            type="file"
            @change="preview"
          />
          <PlusCircleIcon
            class="cursor-pointer text-gray-400"
            size="3x"
            v-if="!image"
          />
        </div>
      </div>
      <primary v-if="image" style="margin-top: 5px" @click.native="uploadBadge"
        >Upload</primary
      >
    </div>
    <label class="block mb-1 text-gray-700">Silent notification</label>
    <primarycheckbox v-model="notification.options.silent" />
    <primary
      :disabled="loading"
      :loading="loading"
      style="margin-left: auto"
      class="mb-5"
      @click.native="send"
      >Send notification</primary
    >
    <transition name="popup">
      <success v-if="sended" text="Notification sended sucessfully" />
    </transition>
  </div>
</template>
<script>
import contentLoader from '@/components/dashboard/loader/contentLoader'
import notFound from '@/components/dashboard/notFound'
import primary from '@/components/dashboard/button/primary'
import errorModal from '@/components/dashboard/modals/error'
import { XIcon, PlusCircleIcon } from 'vue-feather-icons'
import success from '@/components/dashboard/modals/success'
import primarycheckbox from '@/components/dashboard/checkbox/primarycheckbox'
export default {
  components: {
    primarycheckbox,
    primary,
    notFound,
    contentLoader,
    XIcon,
    success,
    PlusCircleIcon,
  },
  async fetch() {
    let [thumbnails, badges] = await Promise.all([
      this.$axios.$get('/api/internal/getThumbnails'),
      this.$axios.$get('/api/internal/getBadges'),
    ])
    this.thumbnails = thumbnails
    this.badges = badges
  },
  data() {
    return {
      sended: false,
      errorMessage: '',
      thumbnails: [],
      badges: [],
      image: null,
      file: null,
      selectedIcon: null,
      selectedBadge: null,
      loading: false,
      notification: {
        title: '',
        options: {
          body: '',
          icon: '',
          sound: 'default',
          vibrate: [500, 100, 500],
          badge: '',
          silent: false,
        },
      },
    }
  },
  methods: {
    async deleteBadge(_id) {
      try {
        await this.$axios.$post('/api/internal/deleteBadge', {
          _id,
        })
        let i = this.badges.findIndex((badge) => badge._id === _id)
        if (i !== -1) {
          this.badges.splice(i, 1)
        }
        this.$fetch()
      } catch (err) {
        console.log(err)
      }
    },
    async uploadBadge() {
      let formdata = new FormData()
      formdata.append('badge', this.file)
      try {
        this.errorMessage = ''
        let { data } = await this.$axios.$post(
          '/api/internal/uploadBadge',
          formdata
        )
        this.image = null
        this.file = null
        this.$fetch()
      } catch ({ response }) {
        this.errorMessage = response.data.message
      }
    },
    preview(e) {
      let [file] = e.target.files
      this.file = file
      this.image = URL.createObjectURL(file)

      console.log(this.image)
    },
    freeMemory() {
      URL.revokeObjectURL(this.image)
    },
    selectThumbnail(i) {
      this.selectedIcon = this.thumbnails[i]
      this.notification.options.icon = this.thumbnails[i]
    },
    selectBadge(i) {
      this.selectedBadge = this.badges[i].path
      this.notification.options.badge = this.badges[i].path
    },
    async send() {
      this.loading = true
      try {
        await this.$axios.$post('/api/internal/sendNotification', {
          notification: this.notification,
        })
        this.sended = true
        setTimeout(() => {
          this.sended = false
        }, 5000)
      } catch ({ response }) {}
      this.loading = false
    },
  },
  head() {
    return {
      title: 'Dashboard subscriptions',
    }
  },
  layout: 'dashboard',
}
</script>

