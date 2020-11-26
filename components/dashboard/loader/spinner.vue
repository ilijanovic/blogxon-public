<template>
  <div class="half-circle-spinner">
    <div :style="{ color }" class="circle circle-1"></div>
    <div :style="{ color }" class="circle circle-2"></div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'white',
    },
  },
}
</script>
<style lang="scss" scoped>
.half-circle-spinner,
.half-circle-spinner * {
  box-sizing: border-box;
}

.half-circle-spinner {
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin: -2px 0 -2px 8px;
  position: relative;
}

.half-circle-spinner .circle {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: calc(20px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
  border-top-color: white;
  animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
  border-bottom-color: white;
  animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
