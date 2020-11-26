<template>
  <div class="flex justify-center p-5 border rounded-md shadow-md">
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  props: ['message'],
}
</script>
