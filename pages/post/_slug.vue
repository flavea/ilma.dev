<template>
  <GridLayout>
    <Sidebar
      :title="Post.Title"
      :date="formatDate(Post.created_at)"
      :image="Post.Image && !showToC ? Post.Image.url : null"
    >
      <div
        v-if="showToC"
        id="toc"
        class="my-4 p-4 text-sm bg-white border-pink border-1 overflow-y-auto overflow-x-hidden max-h-screen"
      >
        <div
          class="category-title mb-4 text-pink border-b-1 border-solid border-pink font-bold"
        >
          Content List
        </div>
        <div
          v-html="
            $md.render(`[[toc]] ${Post.Content}`).split('</nav>')[0] + '</nav>'
          "
        />
      </div>

      <nuxt-link
        v-for="category in Post.Categories"
        :key="category._id"
        :to="`/blog/${category.Slug}`"
        class="bg-purple text-pink py-2 px-4 mr-2 mt-2 inline-block font-bold text-sm rounded-full lowercase"
      >
        {{ category.Name }}
      </nuxt-link>
    </Sidebar>
    <ContentTemplate :disqus="'news-' + Post.id" :url="url">
      <div v-if="Post.Video" v-html="Post.Video" />
      <div id="full" v-html="$md.render(Post.Content)" />
    </ContentTemplate>
  </GridLayout>
</template>

<script>
import GridLayout from '@/components/templates/grid-layout'
import Sidebar from '@/components/molecules/layout/sidebar'
import ContentTemplate from '@/components/molecules/layout/content-on-grid'
import { formatterMixin } from '@/helpers/formatterMixin'
import Prism from '~/plugins/prism'

export default {
  components: {
    GridLayout,
    Sidebar,
    ContentTemplate,
  },
  mixins: [formatterMixin],
  transition: 'default',
  async asyncData(context) {
    try {
      const Post = await context.app.$axios.get(
        '/post-slug/' + context.params.slug,
        { useCache: true }
      )

      if (Post.data && Post.data.Link) context.redirect(Post.data.Link)
      if (!Post.data) context.redirect('/404')

      return {
        Post: Post.data,
      }
    } catch (error) {
      context.redirect('/404')
    }
  },
  data() {
    return {
      Post: {},
      showToC: false,
    }
  },
  head() {
    return {
      title: this.Post.Title.toLowerCase(),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.Post.Snippet,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.baseInfo.Keywords + ', ' + this.Post.Keywords,
        },
        {
          hid: 'ogtitle',
          name: 'og:title',
          content: this.Post.Title,
        },
        {
          hid: 'ogimage',
          name: 'og:image',
          content: this.Post.Image
            ? this.Post.Image.url
            : process.env.cover.replace('w_auto', 'w_476'),
        },
        {
          hid: 'twittertitle',
          name: 'twitter:title',
          content: this.Post.Title,
        },
        {
          hid: 'twitterimage',
          name: 'twitter:image',
          content: this.Post.Image
            ? this.Post.Image.url
            : process.env.cover.replace('w_auto', 'w_476'),
        },
        {
          hid: 'twitterdescription',
          name: 'twitter:description',
          content: this.Post.Snippet,
        },
      ],
    }
  },
  computed: {
    baseInfo() {
      return this.$store.state.global.baseInfo
    },
    url() {
      return process.env.url + '/post/' + this.Post.slug
    },
  },
  beforeMount() {
    const toc =
      this.$md.render(`[[toc]] ${this.Post.Content}`).split('</nav>')[0] +
      '</nav>'
    this.showToC =
      toc.includes('table-of-contents') &&
      toc !== '<nav class="table-of-contents"></nav>'
  },
  mounted() {
    Prism.highlightAll()

    window.onscroll = () => {
      const header = document.getElementById('toc')

      if (header) {
        const sticky = header.offsetTop
        if (window.pageYOffset > sticky && window.innerWidth >= 1024) {
          header.classList.add('fixed')
          header.classList.add('w-1/5')
        } else {
          header.classList.remove('fixed')
          header.classList.remove('w-1/5')
        }
      }
    }
  },
}
</script>
