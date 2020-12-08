<template>
  <div class="box max-w-screen-md mx-auto">
    <h1 class="my-5 text-xl">Create blog post</h1>
    <div class="my-5">
      <div class="flex justify-between">
        <label class="block mb-1">Title</label>
        <label class="block mb-1">Optional length: 50-60 characters</label>

        <label
          class="block mb-1"
          :class="{
            green: titleLength >= 50 && titleLength <= 60,
            red: titleLength >= maxTitleLength,
          }"
          >{{ titleLength }} / {{ maxTitleLength }}</label
        >
      </div>
      <input
        :style="{
          'border-color': titleLength >= 50 && titleLength <= 60 ? 'green' : '',
        }"
        class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
        @keyup="checkTitleLength"
        @change="checkTitleLength"
        v-model="title"
      />
    </div>
    <div class="my-5">
      <div class="flex justify-between">
        <label class="block mb-1">Description</label>
        <label class="block mb-1">Optional length: 120-160 characters</label>
        <label
          :class="{
            red: descriptionLength >= maxDescriptionLength,
            green: descriptionLength >= 120 && descriptionLength <= 160,
          }"
          >{{ descriptionLength }} / {{ maxDescriptionLength }}</label
        >
      </div>
      <textarea
        :style="{
          'border-color':
            descriptionLength >= 120 && descriptionLength <= 160 ? 'green' : '',
        }"
        class="border p-3 resize-y w-full rounded-md focus:outline-none"
        @keyup="checkDescriptionLength"
        @change="checkDescriptionLength"
        v-model="description"
      ></textarea>
    </div>
    <div class="my-5">
      <div class="flex justify-between">
        <label class="block mb-1">Keywords</label>
        <label class="block mb-1"
          >{{ keywordsLength }} / {{ maxKeywords }}</label
        >
      </div>
      <div class="flex justify-between items-center">
        <input
          class="w-full h-10 py-6 px-4 text-base placeholder-gray-600 border rounded-md focus:outline-none"
          @keydown.space="addKeyword"
          @keyup.enter="addKeyword"
          v-model="keyword"
        />
        <primary class="ml-5" @click.native="addKeyword">Add</primary>
      </div>
      <div class="flex flex-wrap my-5">
        <div
          v-for="(keyword, i) in keywords"
          :key="keyword"
          class="flex border rounded-md mr-2 mb-2 p-2 items-center"
        >
          <p>{{ keyword }}</p>
          <XIcon @click="remove(i)" class="ml-2 cursor-pointer" size="1.2x" />
        </div>
      </div>
      <div class="my-5">
        <label class="block mb-1">Thumbnail</label>
        <div
          :style="{ width: imageWidth + 'px', height: imageHeight + 'px' }"
          class="border rounded-md flex relative"
        >
          <XIcon
            v-if="image"
            @click="removeImage"
            size="2x"
            class="bg-red-700 z-10 cursor-pointer text-red-100 p-1 absolute right-0 top-0 m-3"
          />
          <transition name="fade" mode="out-in">
            <img
              class="object-cover rounded-md absolute w-full h-full top-0 left-0"
              @load="freeMemory"
              v-if="image"
              :src="image"
            />
            <input
              class="cursor-pointer w-full h-full absolute top-0 left-0 opacity-0"
              v-if="!image"
              type="file"
              @change="preview"
            />
          </transition>
          <ImageIcon class="m-auto text-gray-500" v-if="!image" size="4x" />
        </div>
      </div>
    </div>
    <div class="my-5">
      <div class="description">
        <label class="block mb-1">Structured data</label>
      </div>
      <dropdown @selected="selectedOption" :value="options" />
    </div>
    <div class="inputbox">
      <div class="flex justify-between items-center my-3">
        <label class="block mb-1">Markdown editor</label>
        <primary @click.native="textPreview = !textPreview"
          >Toggle preview</primary
        >
      </div>
    </div>
    <TuiEditor
      v-if="!textPreview"
      v-model="post"
      mode="markdown"
      height="800px"
      style="margin-bottom: 20px"
    />
    <mdPreview v-if="textPreview" :text="post" />
    <primary
      class="mb-5"
      @click.native="uploadPost"
      :disabled="disabled"
      style="margin-left: auto"
      >Upload</primary
    >

    <errorModal v-if="errorMessage" :text="errorMessage" />
  </div>
</template>

<script>
import { config, constants } from '@/config'
import primary from '@/components/dashboard/button/primary'
import { XIcon, ImageIcon } from 'vue-feather-icons'
import dropdown from '@/components/dashboard/dropdowns/dashboardDropdown'
import mdPreview from '@/components/dashboard/mdPreview'
import errorModal from '@/components/dashboard/modals/error'
import snarkdown from 'snarkdown'
export default {
  async mounted() {
    await this.$nextTick()
  },
  watch: {
    text(val) {
      this.post = snarkdown(val)
    },
  },
  data() {
    return {
      text: '',
      title: '',
      description: '',
      keywords: [],
      keyword: '',
      image: '',
      post: '',
      file: '',
      errorMessage: '',
      textPreview: false,
      structuredData: constants.structuredDataOptions[0],
      maxTitleLength: config.title_length,
      maxDescriptionLength: config.description_length,
      maxKeywords: config.keywords,
      options: constants.structuredDataOptions,
      imageWidth: config.thumbnail_sizes.width,
      imageHeight: config.thumbnail_sizes.height,
    }
  },
  components: {
    XIcon,
    dropdown,
    ImageIcon,
    errorModal,
    mdPreview,
  },
  methods: {
    selectedOption(val) {
      this.structuredData = val
    },
    removeImage() {
      this.image = ''
      this.file = ''
    },
    async uploadPost() {
      let formdata = new FormData()
      formdata.append('thumbnail', this.file)
      formdata.append('title', this.title)
      formdata.append('description', this.description)
      formdata.append('content', this.post)
      formdata.append('keywords', this.keywords)
      formdata.append('structuredData', this.structuredData)
      try {
        this.errorMessage = ''
        let { data } = await this.$axios.$post(
          '/api/internal/uploadPost',
          formdata
        )
        this.$router.push('/dashboard/blogs')
      } catch ({ response }) {
        this.errorMessage = response.data.message
      }
    },
    preview(e) {
      let [file] = e.target.files
      this.file = file
      this.image = URL.createObjectURL(file)
    },
    checkTitleLength() {
      if (this.title.length > this.maxTitleLength) {
        this.title = this.title.substring(0, this.maxTitleLength)
      }
    },
    checkDescriptionLength() {
      if (this.description.length > this.maxDescriptionLength) {
        this.description = this.description.substring(
          0,
          this.maxDescriptionLength
        )
      }
    },
    freeMemory() {
      URL.revokeObjectURL(this.image)
    },
    remove(i) {
      this.keywords.splice(i, 1)
    },
    addKeyword() {
      let word = this.keyword.trim()
      if (!word || this.keywordsLength >= this.maxKeywords) return
      if (this.keywords.includes(word)) {
        this.keyword = ''
        return
      }
      this.keywords.push(word)
      this.keyword = ''
    },
  },
  computed: {
    disabled() {
      return (
        !this.titleLength ||
        !this.descriptionLength ||
        !this.keywordsLength ||
        !this.image ||
        !this.post
      )
    },
    titleLength() {
      return this.title.length
    },
    descriptionLength() {
      return this.description.length
    },
    keywordsLength() {
      return this.keywords.length
    },
  },
  layout: 'dashboard',
}
</script>
<style lang="scss">
.box {
  /deep/ .te-markdown-tab-section {
    display: none !important;
  }
}
</style>