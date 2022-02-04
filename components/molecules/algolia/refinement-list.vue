<template>
  <div class="categories">
    <div v-if="categories.length > 0">
      <nuxt-link
        v-for="cat in categories"
        :key="cat.id"
        :to="cat.Slug"
        :class="{
          'button-inverse': currentCat.Slug && cat.Slug === currentCat.Slug,
        }"
        class="button text-sm"
      >
        {{ cat.Name }}
      </nuxt-link>
    </div>
    <!-- <div
      v-if="finalItems.length > 1"
      :style="{
        display: 'block!important',
        background: 'var(--yellow)',
        color: 'var(--pink)'
      }"
      class="button"
    >
      Filter by Related Categories
    </div>
    <span v-if="isFromSearch && !finalItems.length">No results.</span>
    <div v-if="finalItems.length > 1">
      <a
        v-for="item in finalItems"
        :key="item.value"
        :href="createURL(item)"
        :style="{ fontWeight: item.isRefined ? 'bold' : '' }"
        :class="{
          'button-inverse': item.isRefined
        }"
        @click.prevent="refining(item.value)"
        class="button"
      >
        {{ item.label }}
        ({{ item.count.toLocaleString() }})
      </a>
    </div> -->
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
      return this.items.filter((item) => item.label !== this.currentCat.Name)
    },
  },
  methods: {
    refining(p) {
      this.$bus.$emit('pagination-change')
      this.refine(p)
    },
  },
}
</script>
