<template>
  <div
    id="latest-posts"
    class="md:mt-3 px-4 md:px-8 lg:px-12 bg-pink lg:bg-transparent pt-16 md:pt-32 lg:pt-0"
  >
    <div class="title font-black py-4 mb-4">
      <span class=" text-purple pb-2 border-b-1 border-purple rounded-tr-lg rounded-tl-lg text-2xl">
        {{ titles[lang] }}
      </span>
    </div>
    <div
      id="posts"
    >
      <nuxt-link
        v-for="(post, idx) in posts"
        :key="post.id"
        :to="'/post/' + post.Slug"
        :target="post.Link ? '_blank' : '_self'"
        class="clearfix pb-2 flex items-center"
      >
        <div
          class="number text-purple mr-2 lg:mr-4 text-3xl lg:text-4xl font-black italic bg-yellow rounded-full px-2 py-1 w-auto h-auto text-center flex items-center transform -rotate-12"
          style="word-break: normal; overflow-wrap: normal"
        >
          <span>{{ getNumber(idx) }}</span>
        </div>
        <div>
          <h2 class="font-black mt-0 text-purple text-xl lg:text-3xl">
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
    background-image: url('/wave-4.svg');
    background-size: 100% auto;
    background-position: top;
    background-repeat: no-repeat;

    @screen lg {
      
    background-image: none;
    }

  #posts {
    height: calc(100% - 56px);
    .date {
      color: #818181;
    }
  }
}
</style>
