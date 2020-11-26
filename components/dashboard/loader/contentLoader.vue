<template>
  <div class="load">
    <p>Loading...</p>
    <div class="half-circle-spinner">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.load {
  color: var(--dark);
  border-radius: 6px;
  padding: 30px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 10px -8px black;
  border: 1px solid #dadada;
  margin-top: 20px;
  font-size: 18px;
  p {
    margin-right: 20px;
  }
}
.half-circle-spinner,
.half-circle-spinner * {
  box-sizing: border-box;
}

.half-circle-spinner {
  width: 30px;
  height: 30px;
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
  border-top-color: var(--dark);
  animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
  border-bottom-color: var(--dark);
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