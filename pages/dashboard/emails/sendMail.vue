<template>
  <div>
    <h1 class="my-3 text-xl">Send email</h1>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">From</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="send"
        v-model="from"
      />
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Subject</label>
      <input
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup.enter="send"
        v-model="subject"
      />
    </div>
    <div class="mb-5 text-gray-700">
      <label class="block mb-1" for="forms-helpTextCode">Message</label>
      <textarea
        class="border p-3 resize-y w-full rounded-md focus:outline-none"
        v-model="text"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
    </div>

    <primary @click.native="send" style="margin-left: auto">Send</primary>
  </div>
</template>
<script>
import primary from '@/components/dashboard/button/primary'
export default {
  head() {
    return {
      title: 'Dashboard send mail',
    }
  },
  data() {
    return {
      from: '',
      text: '',
      subject: '',
    }
  },
  methods: {
    async send() {
      try {
        await this.$axios.$post('/api/internal/sendMail', {
          subject: this.subject,
          from: this.from,
          text: this.text,
        })
      } catch ({ response }) {}
    },
  },
  components: {
    primary,
  },
  layout: 'dashboard',
}
</script>

