<template>
  <div
    :style="{
      'border-left': $store.state.user === user._id ? '5px solid green' : '',
    }"
    class="user"
  >
    <transition name="popup">
      <menuEdit :_id="user._id" @blur.native="menu = false" v-if="menu" />
    </transition>
    <div class="imgbox">
      <picture v-if="user.image || user.image_webp">
        <img :src="user.image" type="image/png" />
        <source :srcset="user.image_webp" type="image/webp" />
      </picture>
      <UserIcon size="2x" style="color: #dadada" />
    </div>
    <div class="infobox">
      <p>Name: {{ user.author.name }}</p>
      <p>Bio: {{ user.author.bio }}</p>
    </div>
    <div @click="menu = true" v-ripple class="menubox">
      <MoreVerticalIcon class="menu" />
    </div>
  </div>
</template>
<script>
import { UserIcon, MoreVerticalIcon } from 'vue-feather-icons'
import menuEdit from '@/components/dashboard/user/userMenu'
import { mapGetters } from 'vuex'
export default {
  props: ['user'],
  components: {
    UserIcon,
    MoreVerticalIcon,
    menuEdit,
  },
  data() {
    return {
      menu: false,
    }
  },
}
</script>
<style lang="scss" scoped>
.user {
  border: 1px solid #dadada;
  border-radius: 6px;
  margin: 15px 0;
  padding: 15px;
  flex: 1;
  display: flex;
  margin-right: 10px;
  margin-bottom: 10px;
  min-width: 300px;
  position: relative;
  &:last-child {
    margin-right: 0;
  }
  .infobox {
    margin: 0 auto 0 20px;
  }
  .imgbox {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid #dadada;

    display: flex;
    align-items: center;
    justify-content: center;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      border-radius: 50%;
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
