<template>
  <div id="lang-switcher" class="fixed">
    <button
      v-for="locale in availableLocales"
      :key="locale.code"
      :class="{
        'button-inverse': locale.code === currentLocale,
      }"
      class="button text-sm"
      @click.prevent="changeLang(locale.code)"
    >
      <span v-if="locale.code === currentLocale">&#187;</span>
      {{ locale.name }}
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return [
        { code: 'en', name: 'English' },
        { code: 'id-ID', name: 'Bahasa Indonesia' },
      ]
    },
    currentLocale() {
      const lang = this.$cookies.get('lang') || 'en'
      return lang
    },
  },
  methods: {
    changeLang(lang) {
      const date = new Date()
      date.setFullYear(2050)
      this.$cookies.set('lang', lang, {
        expires: date,
      })
      window.location.reload()
    },
  },
}
</script>

<style lang="scss" scoped>
#lang-switcher {
  z-index: 9999;
  bottom: 0px;
  left: 20px;
}
</style>
