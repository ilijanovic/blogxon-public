<template>
  <button
    class="flex items-center h-10 px-5 m-2 text-gray-100 transition-colors duration-150 bg-gray-700 rounded-lg focus:outline-none hover:bg-gray-600"
    :class="{ light, disabled }"
  >
    <slot></slot><spinner v-if="loading" />
  </button>
</template>
<script>
import spinner from '@/components/dashboard/loader/spinner'
export default {
  props: {
    light: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    spinner,
  },
}
</script>
<style lang="scss" scoped>
.disabled {
  color: grey !important;
  background: lightgrey !important;
  border-color: lightgrey !important;
  pointer-events: none;
}
</style>
