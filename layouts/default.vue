<template>
  <main class="font-sans bg-purple lg:bg-pink text-base">
    <MenuList />
    <nuxt />
    <LangSwitcher />
    <div
      id="affiliates"
      class="relative z-20 p-4 pb-20 bg-yellow md:p-16 text-purple"
    >
      <Contact />
      <div class="text-purple lg:text-purple">
        © 2013–{{ year }} Copyright Ilma A.
        <nuxt-link to="/credits" class="lg:text-purple">
          All rights reserved.
        </nuxt-link>
      </div>
    </div>
  </main>
</template>

<script>
import MenuList from '@/components/organisms/menu'
import Contact from '@/components/organisms/contact'
import LangSwitcher from '@/components/molecules/lang-switcher'

export default {
  components: {
    MenuList,
    Contact,
    LangSwitcher,
  },
  middleware: 'url-check',
  head() {
    let description = this.baseInfo.Description

    if (description.length > 150) {
      description = description.substr(0, 150) + '...'
    }

    return {
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'twitterdescription',
          name: 'twitter:description',
          content: description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.baseInfo.Keywords,
        },
      ],
    }
  },
  computed: {
    baseInfo() {
      return this.$store.state.global.baseInfo
    },
    year() {
      return new Date().getFullYear()
    },
  },
  created() {
    this.$bus.$on('pagination-change', () => {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.scrollTo(0, 0)
    })
  },
}
</script>
