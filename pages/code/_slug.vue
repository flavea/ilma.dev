<template>
  <SingleLayout>
    <HeaderTemplate
      :class="{ 'relative w-full': !Code.Description && !Code.Images }"
      :title="Code.Name"
    >
      <a
        v-if="Code.PreviewLink"
        :href="
          Code.PreviewLink.includes('http')
            ? Code.PreviewLink
            : previewLink(Code.PreviewLink)
        "
        class="button"
        rel="noreferrer"
        target="_blank"
      >
        See Preview
      </a>
      <a
        v-if="Code.Code"
        :href="Code.Code"
        class="button"
        rel="noreferrer"
        target="_blank"
      >
        Get Code
      </a>
    </HeaderTemplate>

    <div class="mt-0 mb-2 mx-4 xl:mx-0">
      <nuxt-link
        v-for="category in Code.Categories"
        :key="category._id"
        :to="`/codes/${category.Slug}`"
        class="bg-blue text-pink py-2 px-4 mr-2 mt-2 inline-block font-bold text-sm rounded-full lowercase"
      >
        {{ category.Name }}
      </nuxt-link>
    </div>

    <div class="m-4 lg:mx-0">
      <ImageSlider
        v-if="Code.Images.length || Code.ImageLink"
        :images="Code.Images.length ? Code.Images : [Code.ImageLink]"
      />
    </div>

    <div
      v-if="showToC"
      id="toc"
      class="my-4 p-4 text-sm bg-white border-pink border-1 overflow-y-auto overflow-x-hidden rounded-lg"
    >
      <div
        class="category-title mb-4 text-pink border-b-1 border-solid border-pink font-bold"
      >
        Content List
      </div>
      <div
        v-html="
          $md.render(`[[toc]] ${Code.Description}`).split('</nav>')[0] +
          '</nav>'
        "
      />
    </div>

    <ContentTemplate :disqus="'theme-' + Code.id" :url="url">
      <div v-html="$md.render(Code.Description)" />
    </ContentTemplate>

    <div class="m-4 lg:mx-0">
      <nuxt-link
        v-for="category in Code.Categories"
        :key="category._id"
        :to="`/codes/${category.Slug}`"
        class="bg-blue text-pink py-2 px-4 mr-2 mt-2 inline-block font-bold text-sm rounded-full lowercase"
      >
        {{ category.Name }}
      </nuxt-link>
    </div>
  </SingleLayout>
</template>

<script>
import SingleLayout from '@/components/templates/single-layout'
import HeaderTemplate from '@/components/molecules/layout/header'
import ContentTemplate from '@/components/molecules/layout/content'
import ImageSlider from '@/components/molecules/image-slider'
import Prism from '~/plugins/prism'

export default {
  components: {
    HeaderTemplate,
    ContentTemplate,
    ImageSlider,
    SingleLayout,
  },
  transition: 'default',
  async asyncData(context) {
    let getCode = null
    const lang = context.app.$cookies.get('lang') || 'en'
    const Code = await context.app.$axios.get(
      '/codes?Slug=' +
        context.params.slug +
        (lang === 'id-ID' ? '-id&_locale=id-ID' : ''),
      {
        useCache: true,
      }
    )

    if (Code.data.length) getCode = Code.data[0]
    else context.redirect('/404')

    return {
      Code: getCode,
    }
  },
  data() {
    return {
      Code: {},
      showToC: false,
    }
  },
  head() {
    return {
      title: this.Code.Name.toLowerCase(),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.Code.Description.substr(0, 150) + '...',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.baseInfo.Keywords + ', ' + this.Code.Keywords,
        },
        {
          hid: 'ogtitle',
          name: 'og:title',
          content: this.Code.Name,
        },
        {
          hid: 'ogimage',
          name: 'og:image',
          content:
            this.Code.Images.length > 0
              ? this.Code.Images[0].length
              : this.Code.ImageLink !== ''
              ? this.Code.ImageLink
              : process.env.cover.replace('w_auto', 'w_476'),
        },
        {
          hid: 'twittertitle',
          name: 'twitter:title',
          content: this.Code.Name,
        },
        {
          hid: 'twitterimage',
          name: 'twitter:image',
          content:
            this.Code.Images.length > 0
              ? this.Code.Images[0].length
              : this.Code.ImageLink !== ''
              ? this.Code.ImageLink
              : process.env.cover.replace('w_auto', 'w_476'),
        },
        {
          hid: 'twitterdescription',
          name: 'twitter:description',
          content: this.Code.Description.substr(0, 150) + '...',
        },
      ],
    }
  },
  computed: {
    baseInfo() {
      return this.$store.state.global.baseInfo
    },
    url() {
      const lang = this.$cookies.get('lang') || 'en'
      return (
        process.env.url +
        '/code/' +
        this.Code.Slug +
        (lang === 'id-ID' ? '-id' : '')
      )
    },
  },
  beforeMount() {
    const toc =
      this.$md.render(`[[toc]] ${this.Code.Description}`).split('</nav>')[0] +
      '</nav>'
    this.showToC =
      toc.includes('table-of-contents') &&
      toc !== '<nav class="table-of-contents"></nav>'
  },
  mounted() {
    Prism.highlightAll()
  },
  methods: {
    previewLink(file) {
      return process.env.previewUrl + file
    },
  },
}
</script>
