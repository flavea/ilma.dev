<template>
  <div
    id="page"
    class="relative min-h-screen pb-4 lg:pb-0 lg:grid bg-fixed grid"
  >
    <slot />
  </div>
</template>

<style lang="scss">
#page {

  @screen lg {
    grid-template-columns: 0.6fr 1.4fr;
    grid-template-rows: 1fr;
    grid-template-areas: '. .';
    align-items: start;
  }

  #page-content {
    @screen lg {
      .lines {
        @apply hidden;
      }
    }
  }
}
</style>
