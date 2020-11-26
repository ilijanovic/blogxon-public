<template>
  <div class="max-w-xl mx-auto my-10">
    <div
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <h1 class="my-5 text-xl">Create user</h1>
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Email</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="create"
        v-model="email"
      />
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Password</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="create"
        v-model="password"
      />
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode"
        >Password confirm</label
      >
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="create"
        v-model="passwordConfirm"
      />
    </div>

    <primary
      :loading="loading"
      :disabled="loading"
      @click.native="create"
      style="margin-left: auto"
      >Create</primary
    >
    <errorModal v-if="errorMessage" :text="errorMessage" />
  </div>
</template>

<script>
import primary from '@/components/dashboard/button/primary'
import errorModal from '@/components/dashboard/modals/error'

export default {
  layout: 'dashboard',
  components: {
    errorModal,
    primary,
  },
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      passwordConfirm: '',
      errorMessage: '',
    }
  },

  methods: {
    async create() {
      this.errorMessage = ''
      this.loading = true
      try {
        await this.$axios.$post('/api/internal/createUser', {
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          email: this.email,
        })
        this.$router.push('/dashboard/settings')
        this.loading = false
      } catch ({ response }) {
        this.loading = false
        let { message } = response.data
        this.errorMessage = message
      }
    },
  },
}
</script>

