<template>
  <div>
    <h1 class="my-3 text-xl">Dashboard overview</h1>
    <div class="flex my-4 flex-wrap">
      <card
        @click.native="$router.push('/dashboard/emails')"
        text="Emails"
        :value="emails"
      />
      <card
        @click.native="$router.push('/dashboard/subscriptions')"
        text="Subscriptions"
        :value="subscriptions"
      />
      <card
        @click.native="$router.push('/dashboard/blogs')"
        text="Blogs"
        :value="blogs"
      />
    </div>
    <div class="flex my-4 flex-wrap">
      <NuxtLink class="flex-1" to="/dashboard/emails/sendMail">
        <actionCard action="Write email">
          <MailIcon size="4x" />
        </actionCard>
      </NuxtLink>
      <NuxtLink class="flex-1" to="/dashboard/subscriptions">
        <actionCard action="Write notification">
          <SendIcon size="4x" />
        </actionCard>
      </NuxtLink>
      <NuxtLink class="flex-1" to="/dashboard/blogs/createPost">
        <actionCard action="Write blog">
          <BookIcon size="4x" />
        </actionCard>
      </NuxtLink>
    </div>

    <div class="flex">
      <div class="flex-1 mr-3 shadow-md border rounded-lg">
        <barchart :viewsChartData="viewsChartData" />
      </div>
      <div class="flex-1 mr-3">
        <statistics :statistics="statistics" />
      </div>
    </div>
  </div>
</template>
<script>
import primary from '@/components/dashboard/button/primary'
import errorModal from '@/components/dashboard/modals/error'
import card from '@/components/dashboard/overviewCard'
import actionCard from '@/components/dashboard/actionCard'
import { MailIcon, BookIcon, SendIcon } from 'vue-feather-icons'
import statistics from '@/components/dashboard/statistics'
import barchart from '@/components/dashboard/chart/barchart'
import Chart from 'chart.js'
export default {
  async fetch() {
    try {
      let [
        { emails, subscriptions, blogs },
        statistics,
        viewsChartData,
      ] = await Promise.all([
        this.$axios.$get('/api/internal/dashboardOverview'),
        this.$axios.$get('/api/internal/getStatistics'),
        this.$axios.$get('/api/internal/getViewsChartData'),
      ])
      this.statistics = statistics
      this.viewsChartData = viewsChartData
      this.emails = emails
      this.subscriptions = subscriptions
      this.blogs = blogs
    } catch ({ response }) {
      this.$store.commit('dashboard/SET_ERROR_MESSAGE', response.data.message)
    }
  },
  components: {
    barchart,
    primary,
    errorModal,
    card,
    actionCard,
    MailIcon,
    BookIcon,
    statistics,
    SendIcon,
  },
  layout: 'dashboard',
  data() {
    return {
      emails: null,
      subscriptions: null,
      blogs: null,
      viewsChartData: {
        data: [],
        labels: [],
      },
      statistics: {
        likes: 0,
        views: 0,
      },
    }
  },

  head() {
    return {
      title: 'Dashboard overview',
    }
  },
}
</script>
