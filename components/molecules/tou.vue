<template>
  <div class="ais-Hits-item mt-4 mb-4 tou">
    <div class="category-title">
      <span
        class="text-pink text-3xl border-b-1 border-solid border-pink font-black"
      >
        Terms of Use
      </span>
    </div>
    <div
      class="mt-4 p-4 border-pink border-solid border-1 text-sm bg-white"
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
