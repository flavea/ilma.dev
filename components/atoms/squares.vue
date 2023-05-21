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
