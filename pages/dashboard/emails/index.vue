<template>
  <div class="">
    <h1 class="my-3 text-xl">Emails</h1>
    <div class="flex justify-between mb-5">
      <primary @click.native="$router.go(-1)">go back</primary>
      <NuxtLink to="/dashboard/emails/sendMail">
        <primary>Send email</primary>
      </NuxtLink>
    </div>

    <transition mode="out-in" name="popup">
      <contentLoader v-if="$fetchState.pending" />
      <notFound
        v-if="!emails.length && !$fetchState.pending"
        message="No emails found"
      />
      <div v-if="emails.length && !$fetchState.pending">
        <email
          @delete="removeEmail"
          v-for="email in emails"
          :email="email"
          :key="email._id"
        />
      </div>
    </transition>
  </div>
</template>
<script>
import contentLoader from '@/components/dashboard/loader/contentLoader'
import notFound from '@/components/dashboard/notFound'
import primary from '@/components/dashboard/button/primary'
import errorModal from '@/components/dashboard/modals/error'
import email from '@/components/dashboard/email'
export default {
  async fetch() {
    try {
      let emails = await this.$axios.$get('/api/internal/emails')
      this.emails = emails
    } catch ({ response }) {
      this.$store.commit('dashboard/SET_ERROR_MESSAGE', response.data.message)
    }
  },
  data() {
    return {
      emails: [],
    }
  },
  components: {
    primary,
    email,
    notFound,
    contentLoader,
  },
  methods: {
    removeEmail(id) {
      let i = this.emails.findIndex((email) => email._id === id)
      if (i !== -1) {
        this.emails.splice(i, 1)
      }
    },
  },
  head() {
    return {
      title: 'Dashboard emails',
    }
  },
  layout: 'dashboard',
}
</script>
