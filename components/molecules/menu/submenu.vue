<template>
  <div class="block lg:inline-block">
    <div
      class="menu hover:bg-white hover:text-purple"
      :class="{ 'bg-white text-purple': current === label }"
    >
      <a
        class="block text-purple h-full"
        :class="{ 'text-purple': current !== label }"
        title="click!"
        @click="onClick(label)"
      >
        {{ label }} <span class="text-sm">&#8629;</span>
      </a>
      <div v-if="current === label" v-click-outside="close" class="menu-child">
        <slot />
        <nuxt-link
          v-for="(cat, idx) in links"
          :key="cat.CompleteSlug"
          :to="cat.CompleteSlug"
        >
          <b v-if="idx < 10">00{{ idx + addition }}.</b>
          <b v-else>0{{ idx + addition }}.</b> {{ cat.Name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: () => {
        return ''
      },
    },
    links: {
      type: Array,
      default: () => {
        return []
      },
    },
    current: {
      type: String,
      default: () => '',
    },
    path: {
      type: String,
      default: () => '',
    },
    onClick: {
      type: Function,
      default: () => null,
    },
  },
  computed: {
    addition() {
      if (this.$slots.default) {
        return this.$slots.default.length + 1
      }
      return 1
    },
  },
  methods: {
    close() {
      this.onClick('')
    },
  },
}
</script>
