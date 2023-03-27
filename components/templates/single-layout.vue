<template>
  <div
    id="page-alternate"
    class="py-20 min-h-screen flex flex-col justify-center items-center"
  >
    <div class="circles absolute bottom-0 left-0 z-0 hidden lg:block w-72">
      <div v-for="index in 126" :key="index" class="c" />
    </div>
    <div
      class="circles circles-2 absolute hidden lg:block z-0 right-0 w-72"
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
  background-image: url('/wave-2.svg');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 110% auto;

  @screen lg {
    background-image: url('/wave-3.svg');
  }
}
</style>
