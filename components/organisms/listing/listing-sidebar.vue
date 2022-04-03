<template>
  <div id="category-summary" class="p-4 pb-0 lg:p-10 lg:z-10">
    <div class="relative">
      <PageTitle :path="currentCat.Name || path || ''" />
      <AisSearchBox>
        <div slot-scope="{ currentRefinement, refine }">
          <SearchBox :current-refinement="currentRefinement" :refine="refine" />
        </div>
      </AisSearchBox>
      <AisRefinementList attribute="Categories.Name" operator="and" searchable>
        <div
          slot-scope="{
            items,
            isShowingMore,
            isFromSearch,
            canToggleShowMore,
            refine,
            createURL,
          }"
        >
          <RefinementList
            :items="items"
            :is-showing-more="isShowingMore"
            :is-from-search="isFromSearch"
            :can-toggle-show-more="canToggleShowMore"
            :refine="refine"
            :create-u-r-l="createURL"
            :categories="categories"
            :current-cat="currentCat"
            :path="slug"
          />
        </div>
      </AisRefinementList>
      <AisRefinementList attribute="locale" operator="or" searchable>
        <div
          slot-scope="{
            items,
            isShowingMore,
            isFromSearch,
            canToggleShowMore,
            refine,
            createURL,
          }"
        >
          <RefinementListBasic
            :items="items"
            :is-showing-more="isShowingMore"
            :is-from-search="isFromSearch"
            :can-toggle-show-more="canToggleShowMore"
            :refine="refine"
            :create-u-r-l="createURL"
          />
        </div>
      </AisRefinementList>
      <AisPagination :padding="1">
        <div
          slot-scope="{
            currentRefinement,
            nbPages,
            pages,
            isFirstPage,
            isLastPage,
            refine,
            createURL,
          }"
        >
          <Pagination
            :current-refinement="currentRefinement"
            :nb-pages="nbPages"
            :pages="pages"
            :is-first-page="isFirstPage"
            :is-last-page="isLastPage"
            :refine="refine"
            :create-u-r-l="createURL"
          />
        </div>
      </AisPagination>
    </div>
  </div>
</template>

<script>
import {
  AisRefinementList,
  AisSearchBox,
  AisPagination,
} from 'vue-instantsearch'
import PageTitle from '@/components/atoms/page-title'
import SearchBox from '@/components/molecules/algolia/search-box'
import RefinementList from '@/components/molecules/algolia/refinement-list'
import RefinementListBasic from '@/components/molecules/algolia/refinement-list-basic'
import Pagination from '@/components/molecules/algolia/pagination'

export default {
  components: {
    AisSearchBox,
    AisPagination,
    AisRefinementList,
    PageTitle,
    SearchBox,
    RefinementList,
    Pagination,
    RefinementListBasic,
  },
  props: {
    categories: {
      type: Array,
      default: () => {
        return []
      },
    },
    path: {
      type: String,
      default: () => {
        return ''
      },
    },
    slug: {
      type: String,
      default: () => {
        return ''
      },
    },
    currentCat: {
      type: Object || null,
      default: () => {
        return {}
      },
    },
  },
}
</script>
