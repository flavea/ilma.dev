<template>
  <div
    id="page-alternate"
    class="py-20 min-h-screen flex flex-col justify-center items-center"
  >
    <div class="circles fixed bottom-0 left-0 z-0 hidden lg:block">
      <div v-for="index in 126" :key="index" class="c" />
    </div>
    <div
      class="circles circles-2 fixed hidden lg:block z-0 right-0"
      style="top: 30%"
    >
      <div v-for="index in 126" :key="index" class="c" />
    </div>
    <div class="m-auto w-full max-w-4xl relative z-10">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#page-alternate {
  margin: 0;
  background: url('https://res.cloudinary.com/ilma/image/upload/v1593808511/assets/blobby_fcnzmt.svg')
      no-repeat,
    var(--yellow);
  background-blend-mode: normal, hue;
  background-size: 100% auto;
  background-position: -100px -150px, 0 60px, top;
  background-attachment: fixed;

  @screen lg {
    background: transparent;
  }
}
</style>
