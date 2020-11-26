<template>
  <div class="prevw" v-html="$md.render(text)"></div>
</template>
<script>
export default {
  props: ['text'],
}
</script>
<style lang="scss">
.prevw {
  min-height: 800px;
  margin-bottom: 20px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: 400;
    letter-spacing: 1px;
    margin-bottom: 1em;
    font-size: 1.8em;
    border-left: 3px solid var(--dark);
    padding-left: 8px;
    border-left: 4px solid var(--dark);
    padding-left: 10px;
    color: var(--dark);
  }
  hr {
    margin-bottom: 1em;
  }
  .token {
    background: none;
  }
  h1 {
    font-size: 2.2em;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    font-size: 1.8em;
  }
  h4 {
    font-size: 1.6em;
  }
  h5 {
    font-size: 1.4em;
  }
  h6 {
    font-size: 1.6em;
  }
  p {
    margin-bottom: 1em;
    white-space: pre-line;
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    display: block;
    font-weight: 400;
    letter-spacing: 1px;

    overflow-wrap: break-word;
  }
  .keyword {
    color: #00618a !important;
  }
  a {
    color: #545454;
    border-bottom: 1px solid #545454;
  }
  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    margin-bottom: 1em;
    border-radius: 6px;
    box-shadow: 0 0 10px -4px black;
  }
  blockquote {
    background: rgba(0, 0, 0, 0.05);
    font-style: italic;
    padding: 10px;
    border-radius: 6px;
    border-left: 8px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 1em;
  }
  code {
    background: #f5f2f0;
  }
  pre {
    border-radius: 6px;
  }
  .nuxt-content-highlight {
    margin-bottom: 1em;
  }
}
</style>
