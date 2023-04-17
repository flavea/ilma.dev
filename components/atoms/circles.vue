<template>
  <div
    class="circles"
    :class="{
      'circles-purple': color === 'blue',
      'circles-yellow': color === 'yellow',
    }"
  >
    <div v-for="index in amount" :key="index" class="c" />
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
.circles {
  .c {
    @apply border-yellow border-solid border-1 inline-block mr-2 w-3 h-3 rounded-full;
  }

  &.circles-purple {
    .c {
      @apply border-purple;
    }
  }

  &.circles-yellow {
    .c {
      @apply border-yellow;
    }
  }
}
</style>
