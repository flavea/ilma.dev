<template>
  <AisInstantSearchSsr>
    <Decor />
    <AisConfigure :hits-per-page.camel="hitsPerPage" :page="page - 1" />
    <ListingLayout>
      <ListingContent>
        <div class="max-w-5xl mx-auto py-8">
          <div
            class="relative page-name font-black mb-4 w-full leading-none lg:mb-8 lowercase"
          >
            <h1 class="block text-yellow text-5xl lg:text-6xl">store.</h1>
            <span
              class="absolute text-pink text-5xl lg:text-6xl lg:block w-full top-5 left-5 hidden"
            >
              store.
            </span>
          </div>

          <AisHits>
            <template slot="item" slot-scope="{ item }">
              <div
                class="post xl:mb-4 overflow-hidden p-4 bg-white align-top relative rounded text-center"
              >
                <img
                  v-if="item.Images.length > 0"
                  :src="item.Images[0]"
                  :alt="`Image preview for ${item.Name}`"
                />
                <h1>{{ item.Name }}</h1>
                <a
                  v-if="item.RedBubble"
                  :href="item.RedBubble"
                  class="button"
                  rel="noreferrer"
                  target="_blank"
                >
                  RedBubble (Int)
                </a>
                <a
                  v-if="item.Tees"
                  :href="item.Tees"
                  class="button"
                  rel="noreferrer"
                  target="_blank"
                >
                  Tees (ID)
                </a>
              </div>
            </template>
          </AisHits>
        </div>
      </ListingContent>
    </ListingLayout>
  </AisInstantSearchSsr>
</template>

<script>
import qs from 'qs'
import {
  AisConfigure,
  AisInstantSearchSsr,
  AisHits,
  createServerRootMixin,
} from 'vue-instantsearch'
import Decor from '@/components/molecules/decor'
import { searchClient, renderToString } from '@/helpers/algolia'
import ListingLayout from '@/components/organisms/listing/listing-layout.vue'
import ListingContent from '@/components/organisms/listing/listing-content.vue'

const indexName = 'staging_designs'

export default {
  components: {
    AisConfigure,
    AisInstantSearchSsr,
    AisHits,
    Decor,
    ListingLayout,
    ListingContent,
  },
  provide() {
    return {
      $_ais_ssrInstantSearchInstance: this.instantsearch,
    }
  },
  asyncData({ route }) {
    const newParams = qs.parse(route.fullPath.replace(/^.*\?/, ''))
    return {
      query: newParams.query || '',
      page: newParams.page || 1,
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
  head() {
    return {
      title: 'store',
    }
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

<style lang="scss" scoped>
#category,
.page-name,
.ais-Hits-list,
#category #category-content > div {
  display: block !important;
}
</style>
