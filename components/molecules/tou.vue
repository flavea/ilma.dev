<template>
  <div class="ais-Hits-item mt-4 mb-4 tou">
    <div class="category-title">
      <span
        class="text-yellow text-3xl border-b-1 border-solid border-yellow font-black"
      >
        Terms of Use
      </span>
    </div>
    <div
      class="mt-4 p-4 border-purple border-solid border-1 text-sm bg-white rounded-default"
      v-html="$md.render(baseInfo.TOU)"
    />
  </div>
</template>
<script>
export default {
  computed: {
    baseInfo() {
      return this.$store.state.global.baseInfo
    },
  },
}
</script>
