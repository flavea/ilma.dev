<template>
  <div
    id="page-sidebar"
    class="flex flex-col flex-wrap h-auto w-auto lg:mt-20 lg:items-center"
  >
    <div class="hidden lg:block circles circles-2">
      <div v-for="index in 132" :key="index" class="c" />
    </div>
    <div class="hidden lg:block lines">
      <div v-for="index in 24" :key="index" class="l" />
    </div>
    <div class="m-4 xl:m-0 w-4/5">
      <div
        v-if="date && image"
        class="lowercase text-yellow text-right font-medium"
      >
        {{ date }}
      </div>
      <img v-if="image" :src="image" :alt="`Image for ${title}`" />
      <div class="page-name font-black w-full leading-none lowercase">
        <h1
          :class="{
            'text-5xl': title.split(' ').length <= 1,
            'text-3xl': title.split(' ').length > 1,
          }"
          class="block text-yellow relative"
        >
          {{ title }}
        </h1>
      </div>

      <div
        v-if="date && !image"
        class="lowercase text-purple lg:text-yellow font-medium"
      >
        {{ date }}
      </div>
      <div style="order: 4" class="w-full max-w-full">
        <slot />
      </div>
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

<style lang="scss" scoped>
#page-sidebar {
  @media (max-width: 1023px) {
    .date {
      @apply text-left text-yellow;
    }

    img {
      @apply order-3;
    }

    & > div:not(.circles):not(.squares) {
      @apply flex flex-col flex-nowrap items-start content-start justify-start;
      width: calc(100% - 2rem);
    }
  }

  .circles {
    @apply absolute z-0 w-48;
    left: 20%;
    bottom: -20px;
  }

  .lines {
    @apply absolute z-0 left-0;
    width: 500px;
    top: 30px;
  }

  & > div {
    @apply relative;
    z-index: 1;
  }
}
</style>
