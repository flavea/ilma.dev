<template>
  <div
    id="page-content"
    class="p-4 bg-white min-h-full m-4 w-auto overflow-hidden relative lg:p-10 lg:w-full lg:m-0"
  >
    <div
      class="lines lines2 fixed right-0 z-10 hidden xl:block"
      style="top: 1rem"
    >
      <div v-for="index in 30" :key="index" class="l" />
    </div>
    <slot />
    <Disqus
      v-if="disqus"
      :identifier="disqus"
      :url="url"
      shortname="hellolittlered"
    />
  </div>
</template>

<script>
export default {
  props: {
    disqus: {
      type: String,
      default: () => {
        return ''
      },
    },
    url: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
}
</script>
