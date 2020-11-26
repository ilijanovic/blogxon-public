<template>
  <div>
    <input
      :value="value"
      @input="$emit('input', $event.target.checked)"
      id="confirm"
      type="checkbox"
    />
    <label for="confirm"></label>
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style lang="scss" scoped>
input[type='checkbox'] {
  display: none;
}

input[type='checkbox'] + label {
  position: relative;
  display: inline-flex;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 24px;
  line-height: 1.3;
}

input[type='checkbox'] + label:before {
  width: 60px;
  height: 30px;
  border-radius: 30px;
  border: 2px solid #ddd;
  background-color: #eee;
  content: '';
  margin-right: 15px;
  transition: background-color 0.5s linear;
}

input[type='checkbox'] + label:after {
  width: 25px;
  height: 25px;
  border-radius: 30px;
  background-color: #fff;
  content: '';
  transition: margin 0.1s linear;
  box-shadow: 0px 0px 5px #aaa;
  position: absolute;
  left: 2px;
  top: 2px;
}

input[type='checkbox']:checked + label:before {
  background-color: var(--dark);
}

input[type='checkbox']:checked + label:after {
  margin: 0 0 0 30px;
}
</style>