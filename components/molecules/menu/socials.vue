<template>
  <div
    id="socials"
    class="hidden lg:flex justify-end items-end z-40 fixed w-13 right-0 bg-pink"
  >
    <div
      id="social-links"
      class="relative text-3xl text-blue text-center w-full bg-pink z-40"
    >
      <div v-for="link in links" :key="link.Name">
        <a
          v-if="link.Icon && link.ShowInSidebar"
          :href="link.Link"
          :alt="link.Name"
          rel="noreferrer"
          target="_blank"
          class="text-3xl text-blue p-2 pt-1 pb-1 text-center block"
          v-html="link.Icon"
        ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    links() {
      return this.$store.state.global.links
    },
  },
}
</script>

<style lang="scss">
#socials {
  top: 3rem;
  height: calc(100% - 3rem);

  &::before {
    @apply absolute bg-blue z-30 hidden;
    content: '';
    height: calc(100% - 1.6rem);
    width: 1px;
    top: -1.35rem;
    left: calc(50%);

    @screen md {
      @apply block;
    }
  }

  i {
    font-style: normal;
  }
}
</style>
