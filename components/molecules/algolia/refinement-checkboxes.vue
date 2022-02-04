<template>
  <div>
    <input
      v-if="canToggleShowMore && items.length"
      type="text"
      placeholder="Search..."
      required
      class="input border-pink border-1 border-solid p-2 block mb-2"
      @input="searchForItems($event.currentTarget.value)"
    />

    <ul>
      <li v-if="isFromSearch && !items.length">No results.</li>
      <li v-for="item in items" :key="item.value">
        <a
          :href="createURL(item)"
          :class="{ 'font-bold': item.isRefined }"
          @click.prevent="refine(item.value)"
        >
          {{ item.label }}
          ({{ item.count.toLocaleString() }})
        </a>
      </li>
    </ul>
    <button v-if="canToggleShowMore" class="button" @click="toggleShowMore">
      {{ !isShowingMore ? 'Show more' : 'Show less' }}
    </button>
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
    canToggleShowMore: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    isShowingMore: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    isFromSearch: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    searchForItems: {
      type: Function,
      default: () => {
        return ''
      },
    },
    toggleShowMore: {
      type: Function,
      default: () => {
        return ''
      },
    },
  },
}
</script>
