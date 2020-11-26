<template>
  <div class="card">
    <transition name="popup">
      <menuBox :_id="blog._id" @blur.native="menu = false" v-if="menu" />
    </transition>
    <div class="profilebox">
      <picture>
        <source :srcset="blog.thumbnail_webp" type="image/webp" />
        <img :src="blog.thumbnail" type="image/png" />
      </picture>
    </div>
    <div class="contentbox">
      <h1>{{ blog.title }}</h1>
      <div style="display: flex">
        <div>
          <small><b>ID:</b> {{ blog._id }}</small>
          <small><b>Slug:</b> {{ blog.slug }}</small>
        </div>
        <small><b>Description:</b> {{ blog.description }}</small>
      </div>
    </div>
    <div class="rightbox">
      <div @click="menu = true" class="menubox">
        <MoreVerticalIcon class="menu" />
      </div>
      <div style="display: flex; align-items: center">
        <small>{{ blog.views }}</small>
        <EyeIcon style="color: grey" />
      </div>
    </div>
  </div>
</template>
<script>
import { MoreVerticalIcon, EyeIcon } from 'vue-feather-icons'
import menuBox from '@/components/dashboard/blogCard/menu'
export default {
  props: ['blog'],
  data() {
    return {
      menu: false,
    }
  },
  components: {
    MoreVerticalIcon,
    menuBox,
    EyeIcon,
  },
}
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  border: 1px solid #dadada;
  box-shadow: 0 0 10px -8px black;
  padding: 10px;
  margin: 20px 0;
  position: relative;
  .rightbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  img {
    width: 150px;
    height: 150px;
    object-fit: contain;
    display: block;
    border-radius: 6px 0 6px 0;
    margin: -10px 0 -10px -10px;
    border-radius: 6px 0 0 6px;
    border-right: 1px solid #dadada;
  }
  .contentbox {
    margin-right: auto;
    padding: 0 15px;
    small {
      margin-top: 5px;
      display: block;
      color: grey;
      font-size: 15px;
      margin-right: 8px;
    }
  }
  .menubox {
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    position: relative;
    cursor: pointer;
    .menu {
      margin: auto;
      color: grey;
    }
  }
}
</style>
