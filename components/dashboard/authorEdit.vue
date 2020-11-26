<template>
  <div class="usersbox">
    <h2>Author settings</h2>

    <div class="settings">
      <div class="settingbox">
        <small>Name</small>
        <input @keyup.enter="save" v-model="author.name" />
      </div>
      <div class="settingbox">
        <small>Bio</small>
        <textarea v-model="author.bio"></textarea>
      </div>
      <div class="settingbox">
        <small>Github URL</small>
        <input @keyup.enter="save" v-model="author.githubLink" />
      </div>
      <div class="settingbox">
        <small>Stackoverflow URL</small>
        <input @keyup.enter="save" v-model="author.stackoverflowLink" />
      </div>
      <div class="settingbox">
        <small>Twitter URL</small>
        <input @keyup.enter="save" v-model="author.twitterLink" />
      </div>
    </div>
    <div class="preview">
      <img :src="author.image" />
    </div>
    <primary
      :disabled="loading"
      style="margin-left: auto"
      :loading="loading"
      @click.native="save"
      >Save</primary
    >
    <transition name="popup">
      <success v-if="finished" text="Saved!" />
    </transition>
  </div>
</template>

<script>
import success from '@/components/dashboard/modals/success'
export default {
  components: {
    success,
  },
  methods: {
    async save() {
      this.loading = true
      try {
        let author = await this.$axios.$post('/api/internal/saveAuthor', {
          twitterLink: this.author.twitterLink,
          githubLink: this.author.githubLink,
          stackoverflowLink: this.author.stackoverflowLink,
          name: this.author.name,
          bio: this.author.bio,
        })
        this.finished = true
        setTimeout(() => {
          this.finished = false
        }, 5000)
        this.$emit('refresh')
      } catch ({ response }) {
        this.$store.commit(
          'dashboard/SET_ERROR_MESSAGE',
          response?.data.message
        )
      }
      this.loading = false
    },
  },
  data() {
    return {
      finished: false,
      loading: false,
    }
  },
  props: {
    type: Object,
    author: {
      default: {
        name: '',
        bio: '',
        githubLink: null,
        stackoverflowLink: null,
        twitterLink: null,
        image: '',
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.inputbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 10px -8px black;
  border: 1px solid #dadada;
  border-radius: 6px;
  padding: 15px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }
}
.usersbox {
  box-shadow: 0 0 10px -8px black;
  border: 1px solid #dadada;
  border-radius: 6px;
  padding: 15px;
  margin-top: 20px;
  max-width: 500px;
  .users {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
  }
}
.settingbox {
  margin-top: 1em;

  input {
    width: 100%;
  }
  textarea {
    resize: none;
    width: 100%;
  }
}
</style>