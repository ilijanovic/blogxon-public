<template>
  <div
    class="px-4 py-3 leading-normal text-green-700 bg-green-100 rounded-lg"
    role="alert"
  >
    <p>{{ text }}</p>
  </div>
</template>
<script>
export default {
  props: ['text'],
}
</script>
