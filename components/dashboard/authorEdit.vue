<template>
  <div class="shadow-md my-5 p-5 max-w-xl rounded-md border">
    <h2 class="text-xl my-5">Author settings</h2>

    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Name</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="save"
        v-model="author.name"
      />
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Bio</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        v-model="author.bio"
      />
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Github URL</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="save"
        v-model="author.githubLink"
      />
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode"
        >Stackoverflow URL</label
      >
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="save"
        v-model="author.stackoverflowLink"
      />
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Twitter URL</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="save"
        v-model="author.twitterLink"
      />
    </div>

    <div class="preview">
      <img :src="author.image" />
    </div>
    <primary
      :disabled="loading"
      style="margin-left: auto"
      :loading="loading"
      @click.native="save"
      >Save</primary
    >
    <transition name="popup">
      <success v-if="finished" text="Saved!" />
    </transition>
  </div>
</template>

<script>
import success from '@/components/dashboard/modals/success'
export default {
  components: {
    success,
  },
  methods: {
    async save() {
      this.loading = true
      try {
        let author = await this.$axios.$post('/api/internal/saveAuthor', {
          twitterLink: this.author.twitterLink,
          githubLink: this.author.githubLink,
          stackoverflowLink: this.author.stackoverflowLink,
          name: this.author.name,
          bio: this.author.bio,
        })
        this.finished = true
        setTimeout(() => {
          this.finished = false
        }, 5000)
        this.$emit('refresh')
      } catch ({ response }) {
        this.$store.commit(
          'dashboard/SET_ERROR_MESSAGE',
          response?.data.message
        )
      }
      this.loading = false
    },
  },
  data() {
    return {
      finished: false,
      loading: false,
    }
  },
  props: {
    type: Object,
    author: {
      default: {
        name: '',
        bio: '',
        githubLink: null,
        stackoverflowLink: null,
        twitterLink: null,
        image: '',
      },
    },
  },
}
</script>
