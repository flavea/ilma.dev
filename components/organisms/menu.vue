<template>
  <div>
    <div
      id="menu-mobile"
      class="lg:hidden fixed top-0 right-0  z-50 cursor-pointer rounded-bl-default flex items-center justify-center"
      :class="{ 'bg-yellow': !isOpen, 'bg-pink': isOpen }"
      @click="isOpen = !isOpen"
    >
    <div>
      <div v-if="!isOpen" id="hamburger"></div>
      <div v-if="isOpen" id="close" class="mr-5"></div></div>
    </div>

    <Socials />
    <Links :class="{ hidden: !isOpen, block: isOpen }" />
  </div>
</template>

<script>
import Socials from '@/components/molecules/menu/socials'
import Links from '@/components/molecules/menu/links'

export default {
  components: {
    Socials,
    Links,
  },
  data() {
    return {
      isOpen: false,
    }
  },
  watch: {
    $route() {
      this.isOpen = false
    },
  },
}
</script>

<style lang="scss">
#menu-mobile {
  width: 60px;
  height: 60px;
  > div {
    width: 30px;
    height: 30px;
  }

  #hamburger {
    margin-top: 50%;
    transition: transform 0.5s linear 0.5s, background 0.5s;
    width: 30px;
    height: 2px;
    @apply bg-purple relative;
    transition-duration: 0.5s;

    &::before {
      width: 30px;
      height: 2px;
      @apply bg-purple relative;
      transition-duration: 0.5s;
      content: '';
      position: absolute;
      top: -8px;
      left: 0;
    }

    &::after {
      width: 30px;
      height: 2px;
      @apply bg-purple absolute right-0;
      transition-duration: 0.5s;
      content: '';
      bottom: -8px;
    }
  }

  #close {
    @apply transform rotate-45;

    &::before {
      @apply absolute bg-purple transform rotate-90;
      transition-duration: 0.5s;
      content: '';
      top: -2px;
      width: 30px;
      left: 8px;
      height: 2px;
    }

    &::after {
      @apply absolute bottom-0 right-0 bg-purple transform;
      transition-duration: 0.5s;
      content: '';
      width: 30px;
      left: 8px;
      height: 2px;
    }
  }
}
</style>
