<template>
  <div
    id="page"
    class="relative min-h-screen pb-4 block lg:pb-0 lg:grid bg-fixed grid"
  >
    <slot />
  </div>
</template>

<style lang="scss">
#page {
  background: url('https://res.cloudinary.com/ilma/image/upload/v1593808511/assets/blobby_fcnzmt.svg')
      no-repeat,
    var(--yellow);
  background-blend-mode: normal, hue;
  background-size: 100% auto;
  background-position: -50px -50px, 0 60px, top;

  @screen md {
    background-position: -50px -140px, 0 60px, top;
  }

  @screen lg {
    grid-template-columns: 0.6fr 1.4fr;
    grid-template-rows: 1fr;
    grid-template-areas: '. .';
    background: transparent;
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
