<template>
  <div id="page-content">
    <div
      class="lines lines2 fixed right-0 z-10 hidden xl:block"
      style="top: 1rem"
    >
      <div v-for="index in 30" :key="index" class="l" />
    </div>
    <div class="p-6 bg-white rounded-lg m-4 lg:my-8 lg:mx-0 border-1 border-purple">
      <slot />
    </div>
    <div v-if="disqus" class="p-6 bg-white rounded-lg m-4 lg:my-8 lg:mx-0 border-1 border-purple">
      <Disqus :identifier="disqus" :url="url" shortname="hellolittlered" />
    </div>
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
