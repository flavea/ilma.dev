<template>
  <div class="mt-8 relative z-10 lg:mr-8">
    <slot />
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
</template>

<script>
import { AisPagination } from 'vue-instantsearch'
import Pagination from '@/components/molecules/algolia/pagination'

export default {
  components: {
    AisPagination,
    Pagination,
  },
  transition: 'default',
  watchQuery: ['page'],
}
</script>
