<template>
  <div>
    <transition name="slideIn">
      <errorModal :message="errorMessage" v-if="errorMessage" />
    </transition>
    <dashboardSidebar />
    <div class="px-5 pl-24 m-auto max-w-screen-xl">
      <Nuxt />
    </div>
  </div>
</template>
<script >
import dashboardSidebar from '@/components/dashboard/layout/dashboardSidebar'
import errorModal from '@/components/dashboard/modal/errorModal'
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapGetters({
      errorMessage: 'dashboard/errorMessage',
    }),
  },
  components: {
    errorModal,
    dashboardSidebar,
  },
}
</script>
<style lang="scss">

.slideIn-enter,
.slideIn-leave-to {
  transform: translateY(-100%);
}
.slideIn-enter-active,
.slideIn-leave-active {
  transition: ease-out 300ms;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: ease-out 300ms;
}
.popup-enter,
.popup-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
.popup-enter-active,
.popup-leave-active {
  transition: 300ms;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-active,
.fade-enter-active {
  transition: opacity 300ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 200ms;
}
.layout-enter {
  opacity: 0;
  transform: scale(0.95);
}
.layout-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.layout-enter-active,
.layout-leave-active {
  transition: 500ms;
  overflow: hidden;
}
.nuxt-link-active {
  background: #f3f4f6;
  color: #374151;
}
</style>
