<template>
  <div
    @mousedown="$event.preventDefault()"
    tabindex="0"
    @blur="open = false"
    class="div"
  >
    <primary :class="{ open }" @click.native="openDrop($el)"
      >Tools <ChevronDownIcon style="margin: -3px 0" size="1.2x"
    /></primary>
    <div v-if="open" class="options">
      <NuxtLink v-for="link in links" :key="link.link" :to="link.link">
        <primary @click.native="close">{{ link.text }}</primary>
      </NuxtLink>
    </div>
  </div>
</template>
<script>
import primary from '@/components/dashboard/button/primary'
import { ChevronDownIcon } from 'vue-feather-icons'
export default {
  components: {
    primary,
    ChevronDownIcon,
  },
  methods: {
    openDrop(el) {
      el.focus()
      this.open = true
    },
    close() {
      this.open = false
      this.$emit('close')
    },
  },
  data() {
    return {
      open: false,
      links: [
        {
          text: 'Discount code finder',
          link: '/tools/discount-code-finder',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
svg {
  margin-left: 15px !important;
}
div {
  position: relative;
}
button {
  width: 100%;
}
.options {
  position: absolute;
  width: 100%;
  box-shadow: 0 0 10px -7px black;
  button {
    border-radius: 0;
  }
}
.open {
  border-radius: 6px 6px 0 0;
}
</style>
