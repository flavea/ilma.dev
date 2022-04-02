<template>
  <AisInstantSearchSsr>
    <Decor />
    <AisConfigure
      :hits-per-page.camel="hitsPerPage"
      :filters="`${filter} AND Categories.Name:'${currentCat.Name}'`"
      :page="page - 1"
    />
    <ListingLayout>
      <ListingSidebar
        path="codes"
        :categories="categories"
        :current-cat="currentCat"
      />
      <ListingContent>
        <TermsOfUse class="mb-4" />
        <AisHits>
          <template slot="item" slot-scope="{ item }">
            <Code :item="item" />
          </template>
        </AisHits>
      </ListingContent>
    </ListingLayout>
  </AisInstantSearchSsr>
</template>

<script>
import {
  AisConfigure,
  AisInstantSearchSsr,
  AisHits,
  createServerRootMixin,
} from 'vue-instantsearch'
import qs from 'qs'
import Decor from '@/components/molecules/decor'
import Code from '@/components/molecules/code'
import { searchClient, renderToString } from '@/helpers/algolia'
import TermsOfUse from '@/components/molecules/tou'
import ListingSidebar from '@/components/organisms/listing/listing-sidebar.vue'
import ListingLayout from '@/components/organisms/listing/listing-layout.vue'
import ListingContent from '@/components/organisms/listing/listing-content.vue'

const indexName = 'staging_codes'

export default {
  components: {
    AisConfigure,
    AisInstantSearchSsr,
    AisHits,
    Decor,
    Code,
    TermsOfUse,
    ListingSidebar,
    ListingLayout,
    ListingContent,
  },
  provide() {
    return {
      $_ais_ssrInstantSearchInstance: this.instantsearch,
    }
  },
  transition: 'default',
  asyncData({ app, store, route, params, redirect }) {
    const lang = app.$cookies.get('lang') || 'en'
    const category = store.state.global.codeCategories.find(
      (cat) => cat.Slug === params.slug
    )

    const newParams = qs.parse(route.fullPath.replace(/^.*\?/, ''))
    let filter = ''

    if (lang === 'en') filter = 'locale:' + lang
    else filter = 'locale:' + lang

    if (!category) redirect('/404')
    else {
      return {
        currentCat: category,
        query: newParams.query || '',
        page: newParams.page || 1,
        hitsPerPage: 12,
        filter,
      }
    }
  },
  data() {
    const mixin = createServerRootMixin({
      searchClient,
      indexName,
    })
    return {
      ...mixin.data(),
    }
  },
  head() {
    return {
      title: this.currentCat.Name.toLowerCase() + ' - codes',
    }
  },
  computed: {
    categories() {
      return this.$store.state.global.codeCategories
    },
  },
  watchQuery: ['page'],
  serverPrefetch() {
    return this.instantsearch
      .findResultsState({
        component: this,
        renderToString,
      })
      .then((algoliaState) => {
        this.$ssrContext.nuxt.algoliaState = algoliaState
      })
  },
  beforeMount() {
    const results =
      (this.$nuxt.context && this.$nuxt.context.nuxtState.algoliaState) ||
      window.__NUXT__.algoliaState

    this.instantsearch.hydrate(results)

    delete this.$nuxt.context.nuxtState.algoliaState
    delete window.__NUXT__.algoliaState
  },
}
</script>
