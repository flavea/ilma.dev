<template>
  <div class="mx-4 xl:m-0 xl:flex xl:justify-between xl:items-center">
    <div class="lg:w-1/2">
      <div class="page-name font-black w-full leading-none lowercase">
        <h1
          :class="{
            'text-5xl': title.split(' ').length <= 1,
            'text-3xl': title.split(' ').length > 1,
          }"
          class="text-yellow font-black m-0"
        >
          {{ title }}
        </h1>
      </div>
      <div v-if="date" class="lowercase text-yellow font-medium">
        {{ date }}
      </div>
    </div>
    <div class="xl:ml-4">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      },
    },
    image: {
      type: String,
      default: () => {
        return ''
      },
    },
    date: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
}
</script>
