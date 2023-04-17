<template>
  <div>
    <input
      v-model="currentRefinement"
      type="search"
      placeholder="Search"
      class="w-full bg-transparent text-purple input border-purple border-1 border-solid p-2 block mb-2 bg-white"
      style="width: 100% !important"
      @input="refine($event.currentTarget.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    currentRefinement: {
      type: String,
      default: () => {
        return ''
      },
    },
    refine: {
      type: Function,
      default: () => {
        return ''
      },
    },
  },
}
</script>
