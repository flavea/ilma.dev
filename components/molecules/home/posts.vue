<template>
  <div
    id="latest-posts"
    class="p-4 pt-0 md:p-0 md:mt-4"
  >
    <div class="title font-black py-4">
      <span class="bg-yellow text-purple p-4 rounded-tr-lg rounded-tl-lg">
        {{ titles[lang] }}
      </span>
    </div>
    <div
      id="posts"
      class="bg-white p-6 rounded-tr-lg rounded-br-lg rounded-bl-lg"
    >
      <nuxt-link
        v-for="(post, idx) in posts"
        :key="post.id"
        :to="'/post/' + post.Slug"
        :target="post.Link ? '_blank' : '_self'"
        class="clearfix mb-2 flex items-center"
      >
        <div
          class="number text-purple mr-2 lg:mr-4 text-3xl lg:text-4xl font-black italic bg-yellow rounded-full px-1 w-auto h-auto text-center flex items-center transform -rotate-12"
          style="word-break: normal; overflow-wrap: normal"
        >
          <span>{{ getNumber(idx) }}</span>
        </div>
        <div>
          <h2 class="font-black mt-0 text-purple lg:text-3xl">
            {{ post.Title }}
          </h2>
          <span class="text-gray text-sm lg:text-base">
            {{ formatDate(post.created_at) }}
          </span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { formatterMixin } from '@/helpers/formatterMixin'

export default {
  mixins: [formatterMixin],
  props: {
    posts: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      titles: {
        en: 'Latest Blog Posts',
        'id-ID': 'Pos Terbaru',
      },
    }
  },
  computed: {
    lang() {
      return this.$cookies.get('lang') || 'en'
    },
  },
  methods: {
    getNumber(idx) {
      if (parseInt(idx) > 10) {
        return idx
      } else {
        return `0${idx + 1}`
      }
    },
  },
}
</script>

<style lang="scss">
#latest-posts {
  #posts {
    height: calc(100% - 56px);
    .date {
      color: #818181;
    }
  }
}
</style>
