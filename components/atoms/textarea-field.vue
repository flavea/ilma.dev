<template>
  <div class="textarea border-purple border-1 border-solid p-2 block mb-2">
    <label
      class="block border-b-1 border-purple border-solid text-purple font-bold mb-2 pb-2"
    >
      {{ label }}
    </label>
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
