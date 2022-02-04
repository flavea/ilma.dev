<template>
  <AisInstantSearchSsr>
    <Decor />
    <AisConfigure
      :hits-per-page.camel="hitsPerPage"
      :filters="`Category.Name:'${currentCat.Name}'`"
      :page="page - 1"
    />
    <ListingLayout>
      <ListingSidebar
        path="resources"
        :categories="categories"
        :current-cat="currentCat"
      />
      <ListingContent>
        <AisHits>
          <template slot="item" slot-scope="{ item }">
            <Resource :item="item" />
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
import Resource from '@/components/molecules/resource'
import { searchClient, renderToString } from '@/helpers/algolia'
import ListingSidebar from '@/components/organisms/listing/listing-sidebar.vue'
import ListingContent from '@/components/organisms/listing/listing-content.vue'
import ListingLayout from '@/components/organisms/listing/listing-layout.vue'

const indexName = 'staging_resources'

export default {
  components: {
    AisConfigure,
    AisInstantSearchSsr,
    AisHits,
    Decor,
    Resource,
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
  asyncData(context) {
    const category = context.store.state.global.resourceCategories.find(
      (cat) => cat.Slug === context.params.slug
    )

    if (!category) context.redirect('/404')

    const params = qs.parse(context.route.fullPath.replace(/^.*\?/, ''))

    return {
      currentCat: category,
      query: params.query || '',
      page: params.page || 1,
      hitsPerPage: 12,
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
      title: this.currentCat.Name.toLowerCase() + ' - Resources',
    }
  },
  computed: {
    categories() {
      return this.$store.state.global.resourceCategories
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
