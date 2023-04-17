<template>
  <div class="input border-purple border-1 border-solid p-2 block mb-2">
    <label>{{ label }}</label>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
}
</script>

<style lang="scss">
.input {
  & > label {
    @apply block w-full font-bold border-r-0 border-b-1 mr-0 mb-2 pb-2 border-purple text-purple;

    @screen md {
      @apply inline-block w-1/4 border-r-1 mr-3 mb-0 pb-0 border-b-0;
    }
  }

  input {
    @apply w-full;

    @screen md {
      width: calc(70%);
    }
  }
}
</style>
