<template>
  <div
    class="shadow-md p-3 rounded-md border container mx-auto mt-20 max-w-xl px-6"
  >
    <h1
      class="p-5 transform -translate-y-10 rounded-md text-gray-100 bg-gray-700 text-xl"
    >
      Admin login
    </h1>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Email</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="login"
        v-model="email"
      />
    </div>
    <div class="my-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Password</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        type="password"
        @keyup.enter="login"
        v-model="password"
      />
    </div>

    <primary
      :loading="loading"
      :disabled="loading"
      @click.native="login"
      style="margin-left: auto"
      >Login</primary
    >
    <errorModal v-if="errorMessage" :text="errorMessage" />
    <warnModal v-if="offline" text="You are offline" />
  </div>
</template>
<script>
import primary from '@/components/dashboard/button/primary'
import errorModal from '@/components/dashboard/modals/error'
import warnModal from '@/components/dashboard/modals/warning'
export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      errorMessage: '',
      offline: false,
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.errorMessage = ''
      if (this.$nuxt.isOffline) {
        this.offline = true
        this.loading = false
        return
      }
      try {
        let { data } = await this.$axios.$post('/api/internal/login', {
          password: this.password,
          email: this.email,
        })
        this.$store.commit('SET_LOGIN', true)
        this.$router.push('/dashboard')
      } catch ({ response }) {
        let { message } = response.data
        this.errorMessage = message
      }
      this.loading = false
    },
  },
  middleware: 'redirectDashboard',
  components: {
    primary,
    errorModal,
    warnModal,
  },
}
</script>

