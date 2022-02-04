<template>
  <SingleLayout>
    <HeaderTemplate :title="Page.Title" :image="Page.Image" />
    <ContentTemplate>
      <div v-html="$md.render(Page.Content)" />
    </ContentTemplate>
  </SingleLayout>
</template>

<script>
import SingleLayout from '@/components/templates/single-layout'
import HeaderTemplate from '@/components/molecules/layout/header'
import ContentTemplate from '@/components/molecules/layout/content'

export default {
  components: {
    HeaderTemplate,
    ContentTemplate,
    SingleLayout,
  },
  transition: 'default',
  asyncData(context) {
    const page = context.store.state.global.pages.filter(
      (cat) => cat.Slug === context.params.slug
    )
    if (page.length === 0) {
      context.redirect('/404')
    }
    return {
      Page: page.length > 0 ? page[0] : {},
    }
  },
  data() {
    return {
      Post: {},
    }
  },
  head() {
    return {
      title: this.Page.Title.toLowerCase(),
    }
  },
  computed: {
    baseInfo() {
      return this.$store.state.global.baseInfo
    },
    url() {
      if (process.isClient) return window.location.href
      return ''
    },
  },
}
</script>
