<template>
  <div
    :class="{ disabled: value === null }"
    class="flex-1 items-center hover:bg-gray-100 cursor-pointer text-xl flex p-3 py-5 justify-between mr-3 border rounded flex shadow-md"
  >
    <h2>{{ text }}</h2>
    <p v-if="value !== null">{{ value }}</p>
    <spinner v-if="value === null" />
  </div>
</template>

<script>
import spinner from '@/components/dashboard/loader/spinner'
export default {
  components: {
    spinner,
  },
  props: {
    text: {
      type: String | null,
      required: true,
    },
    value: {
      type: Number | null,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.disabled {
  pointer-events: none;
  background: lightgrey;
}
</style>
