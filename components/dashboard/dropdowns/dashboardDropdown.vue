<template>
  <div class="max-w-xs border rounded-md">
    <div :class="{ open }">
      <div
        @blur="open = false"
        tabindex="0"
        @click="openDrop($event)"
        class="flex justify-between p-3 outline-none cursor-pointer items-center"
      >
        <p>{{ selected }}</p>
        <ChevronDownIcon :style="{ transform: open ? 'rotate(180deg)' : '' }" />
      </div>
    </div>
    <div v-if="open" class="options">
      <div
        @click.prevent="select(option)"
        v-for="option in value"
        :key="option"
        class="flex justify-between hover:bg-gray-200 cursor-pointer p-3 items-center"
        @mousedown.prevent=""
      >
        <p>{{ option }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons'
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ChevronDownIcon,
  },
  methods: {
    openDrop(e) {
      this.open = true
      e.target.focus()
    },
    select(option) {
      this.selected = option
      this.$emit('selected', option)
      this.open = false
    },
  },
  data() {
    return {
      selected: this.value[0],
      open: false,
    }
  },
}
</script>
