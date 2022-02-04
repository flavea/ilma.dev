<template>
  <div class="squares" :class="{ 'squares-pink': color === 'pink' }">
    <div v-for="index in amount" :key="index" class="s" />
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
.squares {
  .s {
    @apply border-blue border-solid border-1 inline-block mr-2 w-3 h-3 rounded-full transform rotate-45;
  }

  &.squares-pink {
    .s {
      @apply border-pink;
    }
  }
}
</style>
