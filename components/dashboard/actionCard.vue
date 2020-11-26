<template>
  <div
    class="flex-1 hover:bg-gray-100 cursor-pointer text-gray-700 text-xl flex p-3 justify-between mr-3 border rounded flex shadow-md"
  >
    <div class="box">
      <slot></slot>
    </div>
    <div class="flex items-end">
      <p>{{ action }}</p>
      <ArrowRightIcon class="arrow" />
    </div>
  </div>
</template>

<script>
import { ArrowRightIcon } from 'vue-feather-icons'
export default {
  props: ['action'],
  components: {
    ArrowRightIcon,
  },
}
</script>


