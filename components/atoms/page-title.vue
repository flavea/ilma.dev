<template>
  <section
    class="page-name font-black mb-4 w-full leading-none lg:mb-8 lowercase"
  >
    <h1 class="block text-purple lg:text-pink relative text-5xl lg:text-6xl">{{ path }}.</h1>
    <span
      class="absolute text-yellow text-5xl lg:text-6xl lg:block w-full top-5 left-5"
    >
      {{ path }}.
    </span>
  </section>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    path: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
}
</script>
