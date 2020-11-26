<template>
  <div class="h-screen bg-gray-700 text-gray-100 fixed top-0 left-0">
    <NuxtLink
      class="hover:bg-gray-100 transition-all duration-200 rounded-md hover:text-gray-700 block m-2 p-3"
      title="Overview"
      to="/dashboard/overview"
    >
      <MonitorIcon size="2x" />
    </NuxtLink>
    <NuxtLink
      class="hover:bg-gray-100 transition-all duration-200 rounded-md hover:text-gray-700 block m-2 p-3"
      title="Email"
      to="/dashboard/emails"
    >
      <MailIcon size="2x" />
    </NuxtLink>
    <NuxtLink
      class="hover:bg-gray-100 transition-all duration-200 rounded-md hover:text-gray-700 block m-2 p-3"
      title="Blogs"
      to="/dashboard/blogs"
    >
      <BookIcon size="2x" />
    </NuxtLink>
    <NuxtLink
      class="hover:bg-gray-100 transition-all duration-200 rounded-md hover:text-gray-700 block m-2 p-3"
      title="Subscriptions"
      to="/dashboard/subscriptions"
    >
      <SendIcon size="2x" />
    </NuxtLink>
    <NuxtLink
      class="hover:bg-gray-100 transition-all duration-200 rounded-md hover:text-gray-700 block m-2 p-3"
      title="Settings"
      to="/dashboard/settings"
    >
      <SettingsIcon size="2x" />
    </NuxtLink>
    <NuxtLink
      class="hover:bg-gray-100 transition-all duration-200 rounded-md hover:text-gray-700 block m-2 p-3"
      title="Logout"
      to="/dashboard/logout"
    >
      <LogOutIcon size="2x" />
    </NuxtLink>
  </div>
</template>
<script>
import {
  MonitorIcon,
  MailIcon,
  BookIcon,
  SettingsIcon,
  SendIcon,
  LogOutIcon,
} from 'vue-feather-icons'
export default {
  components: {
    MonitorIcon,
    BookIcon,
    SettingsIcon,
    MailIcon,
    SendIcon,
    LogOutIcon,
  },
}
</script>

