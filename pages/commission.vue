<template>
  <GridLayout>
    <Sidebar :title="header">
      <div
        class="my-4 p-4 text-sm bg-white border-pink border-1 overflow-y-auto overflow-x-hidden"
        v-html="$md.render(info)"
      />
    </Sidebar>
    <ContentTemplate>
      <CommissionForm :categories="categories" />
    </ContentTemplate>
  </GridLayout>
</template>

<script>
import GridLayout from '@/components/templates/grid-layout'
import Sidebar from '@/components/molecules/layout/sidebar'
import ContentTemplate from '@/components/molecules/layout/content-on-grid'
import CommissionForm from '@/components/molecules/forms/commission-form'

export default {
  components: {
    GridLayout,
    Sidebar,
    ContentTemplate,
    CommissionForm,
  },
  transition: 'default',
  async asyncData({ app }) {
    const lang = app.$cookies.get('lang') || 'en'
    const index = await app.$axios.get(
      '/commission-information?_locale=' + lang
    )

    return {
      header: index.data.Header,
      info: index.data.Description,
      categories: index.data.commission_categories,
    }
  },
  data() {
    return {
      header: 'Commission',
      info: '',
      categories: [],
    }
  },
  head() {
    return {
      title: 'commission',
    }
  },
  computed: {
    lang() {
      return this.$cookies.get('lang') || 'en'
    },
  },
}
</script>
