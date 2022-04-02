<template>
  <div v-if="finalItems.length > 1">
    <div class="button cursor-default filter-header">Filter by Language</div>
    <span v-if="isFromSearch && !finalItems.length">No results.</span>
    <div>
      <a
        v-for="item in finalItems"
        :key="item.value"
        :href="createURL(item)"
        :class="{
          'button-inverse font-bold': item.isRefined,
        }"
        class="button text-sm"
        @click.prevent="refining(item.value)"
      >
        {{ getRealLabel(item.label) }}
        ({{ item.count.toLocaleString() }})
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    categories: {
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
    isFromSearch: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    showHeader: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    currentCat: {
      type: Object,
      default: () => {
        return {}
      },
    },
    path: {
      type: String,
      default: () => {
        return ''
      },
    },
    showtou: {
      type: Boolean,
      default: () => {
        return true
      },
    },
  },
  computed: {
    finalItems() {
      return this.items
    },
  },
  methods: {
    getPath(slug) {
      return '/' + this.path + '/' + slug
    },
    refining(p) {
      this.$bus.$emit('pagination-change')
      this.refine(p)
    },
    getRealLabel(label) {
      switch (label) {
        case 'en':
          return 'English'
        case 'id-ID':
          return 'Bahasa Indonesia'
        default:
          return label
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.filter-header {
  @apply bg-yellow text-pink block cursor-default;
}
</style>
