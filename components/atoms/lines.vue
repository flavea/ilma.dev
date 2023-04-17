<template>
  <div class="lines" :class="{ 'lines-pink': color === 'pink' }">
    <div v-for="index in amount" :key="index" class="l" />
  </div>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      default: () => {
        return 0
      },
    },
    color: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
}
</script>

<style lang="scss">
.lines {
  .l {
    @apply bg-purple inline-block mx-2 h-24 transform rotate-45;
    width: 1px;
  }

  &.lines-pink {
    .l {
      @apply bg-pink;
    }
  }
}
</style>
