<template>
  <div id="category" class="relative pb-8 min-h-screen">
    <slot />
  </div>
</template>

<style lang="scss">
#category {
  display: block;
  background-image: url('/wave-2.svg');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 110% auto;

  @screen lg {
    background-image: url('/wave-3.svg');
  }


  @screen lg {
    @apply grid;
    grid-template-columns: 0.75fr 1.25fr;
    grid-template-rows: 1fr;
    grid-template-areas: '. .';
    align-items: start;
  }

  @media (max-width: 1023px) {
    .category-title,
    .circles,
    .lines,
    .squares {
      @apply hidden;
    }
  }

  .button {
    @apply font-bold mb-0 cursor-pointer;
    font-style: normal;
  }
}
</style>
