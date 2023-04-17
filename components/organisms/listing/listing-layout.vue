<template>
  <div id="category" class="relative pb-8 min-h-screen">
    <slot />
  </div>
</template>

<style lang="scss">
#category {
  display: block;
  background: url('https://res.cloudinary.com/ilma/image/upload/v1593808511/assets/blobby_fcnzmt.svg')
      no-repeat,
    var(--yellow);
  background-blend-mode: normal, hue;
  background-size: 50% auto;
  background-position: -50px -50px, 0 60px, top;
  background-attachment: fixed;

  @screen md {
    background-position: -50px -140px, 0 60px, top;
  }

  @screen lg {
    @apply grid;
    grid-template-columns: 0.75fr 1.25fr;
    grid-template-rows: 1fr;
    grid-template-areas: '. .';
    background-position: -150px -320px, 0 60px;
    align-items: start;
  }

  @media (max-width: 1023px) {
    background-size: 100% auto;

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
