<template>
  <div v-if="pages.length > 1" class="text-center my-8">
    <!-- <a
      v-if="!isFirstPage"
      :href="createURL(0)"
      @click.prevent="changePage(0)"
      class="p-2 text-center text-purple bg-white border-purple border-1 inline-block ml-1 w-10 h-10"
    >
      ‹‹
    </a> -->
    <a
      v-if="!isFirstPage"
      :href="createURL(currentRefinement)"
      class="p-2 text-center text-purple bg-white border-purple border-1 inline-block ml-1 w-10 h-10"
      @click.prevent="changePage(currentRefinement)"
    >
      ‹
    </a>
    <nuxt-link
      v-for="page in pages"
      :key="page"
      :to="$route.path + '?page=' + (page + 1)"
      :class="{ 'bg-purple text-yellow': page === currentRefinement }"
      class="p-2 text-center text-purple bg-white border-purple border-1 inline-block ml-1 w-10 h-10"
      @click.prevent="changePage(page + 1)"
    >
      {{ page + 1 }}
    </nuxt-link>
    <nuxt-link
      v-if="!isLastPage"
      :to="$route.path + '?page=' + (currentRefinement + 2)"
      class="p-2 text-center text-purple bg-white border-purple border-1 inline-block ml-1 w-10 h-10"
      @click.prevent="changePage(currentRefinement + 2)"
    >
      ›
    </nuxt-link>
    <!-- <a
      v-if="!isLastPage"
      :href="createURL(nbPages)"
      @click.prevent="changePage(nbPages)"
      class="p-2 text-center text-purple bg-white border-purple border-1 inline-block ml-1 w-10 h-10"
    >
      ››
    </a> -->
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Array,
      default: () => {
        return []
      },
    },
    refine: {
      type: Function,
      default: () => {
        return ''
      },
    },
    createURL: {
      type: Function,
      default: () => {
        return ''
      },
    },
    isFirstPage: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    isLastPage: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    nbPages: {
      type: Number,
      default: () => {
        return 0
      },
    },
    currentRefinement: {
      type: Number,
      default: () => {
        return 0
      },
    },
  },
  methods: {
    changePage(p) {
      this.$bus.$emit('pagination-change')
      this.refine(p)
    },
  },
}
</script>
