<template>
  <AisInstantSearchSsr>
    <Decor />
    <AisConfigure :hits-per-page.camel="hitsPerPage" :page="page - 1" />
    <ListingLayout>
      <ListingSidebar path="blog" :categories="categories" />
      <ListingContent id="blog">
        <AisHits>
          <template slot="item" slot-scope="{ item }">
            <Post :item="item" />
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
import Post from '@/components/molecules/post'
import { searchClient, renderToString } from '@/helpers/algolia'
import ListingSidebar from '@/components/organisms/listing/listing-sidebar.vue'
import ListingLayout from '@/components/organisms/listing/listing-layout.vue'
import ListingContent from '@/components/organisms/listing/listing-content.vue'

const indexName = 'staging_posts'

export default {
  components: {
    AisConfigure,
    AisInstantSearchSsr,
    AisHits,
    Decor,
    Post,
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
  asyncData({ route }) {
    const newParams = qs.parse(route.fullPath.replace(/^.*\?/, ''))

    return {
      query: newParams.query || '',
      page: newParams.page || 1,
      hitsPerPage: 12,
    }
  },
  data() {
    const lang = this?.$cookies?.get('lang') || 'en'
    const initialUiState = {
      [indexName]: {
        refinementList: {
          locale: [lang],
        },
      },
    }
    const mixin = createServerRootMixin({
      searchClient,
      indexName,
      initialUiState,
    })
    return {
      ...mixin.data(),
    }
  },
  head() {
    return {
      title: 'blog',
    }
  },
  computed: {
    categories() {
      return this.$store.state.global.postCategories
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
