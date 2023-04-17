<template>
  <main class="font-sans bg-yellow text-base">
    <MenuList />
    <nuxt />
    <LangSwitcher />
    <div
      id="affiliates"
      class="relative z-20 bg-blue text-pink p-4 md:bg-pink md:p-16 md:text-blue"
    >
      <Contact />
      <div class="text-pink lg:text-yellow">
        © 2013–{{ year }} Copyright Ilma A.
        <nuxt-link to="/credits" class="lg:text-blue">
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
