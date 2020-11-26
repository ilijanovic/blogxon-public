<template>
  <div class="box">
    <div :class="{ open }" class="dropdown">
      <div
        @blur="open = false"
        tabindex="0"
        @click="openDrop($event)"
        class="selectbox"
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
        class="option"
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
<style lang="scss" scoped>
.box {
  width: 100%;
  max-width: 300px;
  position: relative;
}
.dropdown {
  border: 1px solid #dadada;

  border-radius: 6px;
  .selectbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    border-radius: 6px;
    &:hover {
      background: #f5f6fa;
    }
  }
}
.options {
  position: absolute;
  width: 100%;
}
.option {
  padding: 15px;
  background: white;
  cursor: pointer;
  &:hover {
    background: #f5f6fa;
  }
  border-left: 1px solid #dadada;
  border-right: 1px solid #dadada;
  &:last-child {
    border-radius: 0 0 6px 6px;
    border-bottom: 1px solid #dadada;
  }
}

.open {
  border-bottom: none;
  border-radius: 6px 6px 0 0;
}
</style>
