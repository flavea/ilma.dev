<template>
  <div
    id="menu"
    class="bg-yellow h-13 fixed w-full top-0 left-0 z-30 lowercase text-xl lg:flex lg:justify-between border-b-1 border-purple"
  >
    <nuxt-link
      class="hidden lg:inline-block site-name text-purple text-2xl pt-2 pl-5 pb-2 pr-5 relative z-30 bg-yellow font-black"
      to="/"
    >
      &lt; {{ lang === 'en' ? 'hello' : 'halo' }} /&gt;
    </nuxt-link>

    <div
      class="menu-list text-purple lg:mr-13 relative z-30 bg-yellow"
    >
      <img
        src="https://res.cloudinary.com/ilma/image/upload/w_40,h_40/v1593808530/assets/icon_cjac0o.png"
        class="w-10 h-10 object-cover mt-4 mb-2 ml-3 lg:hidden"
        alt="Icon"
      />

      <nuxt-link to="/" class="menu">
        {{ lang === 'en' ? 'home' : 'beranda' }}.
      </nuxt-link>

      <nuxt-link
        v-for="p in pages.filter((p) => !p.Hide)"
        :key="p.Slug"
        :to="`/${p.Slug}`"
        class="menu block lg:inline-block"
      >
        {{ p.Title }}.
      </nuxt-link>

      <Submenu
        label="blog"
        :links="postCategories"
        :on-click="openBlock"
        :current="open"
        path="blog"
      >
        <nuxt-link to="/blog"
          ><b>001.</b> {{ lang === 'en' ? 'all' : 'semua' }}</nuxt-link
        >
      </Submenu>

      <Submenu
        :label="lang === 'en' ? 'codes' : 'kode'"
        :links="codeCategories"
        :on-click="openBlock"
        :current="open"
        path="codes"
      />

      <nuxt-link to="/commission" class="menu block lg:inline-block">
        {{ lang === 'en' ? 'hire me' : 'jasa saya' }}.
      </nuxt-link>

      <div
        id="socials-mobile"
        class="text-center block lg:hidden text-3xl mt-12"
      >
        <div class="text-3xl text-center">
          <span v-for="link in links" :key="link.Name">
            <a
              v-if="link.Icon && link.ShowInSidebar"
              :href="link.Link"
              :alt="link.Name"
              class="text-yellow m-2"
              rel="noreferrer"
              target="_blank"
              v-html="link.Icon"
            ></a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Submenu from '@/components/molecules/menu/submenu'

export default {
  components: {
    Submenu,
  },
  data() {
    return {
      open: '',
    }
  },
  computed: {
    postCategories() {
      return this.$store.state.global.postCategories
    },
    codeCategories() {
      return this.$store.state.global.codeCategories
    },
    resourceCategories() {
      return this.$store.state.global.resourceCategories
    },
    pages() {
      return this.$store.state.global.pages
    },
    links() {
      return this.$store.state.global.links
    },
    lang() {
      const lang = this.$cookies.get('lang') || 'en'
      return lang
    },
  },
  methods: {
    openBlock(param) {
      console.log(param)
      if (this.open === param) {
        this.open = null
      } else {
        this.open = param
      }
    },
  },
}
</script>

<style lang="scss">
#menu {
  & > a:first-child {
    @apply hidden;

    @screen xl {
      @apply inline-block;
    }
  }

  &::before {
    @apply absolute left-0 bg-purple z-30 hidden;
    content: '';
    width: calc(100% - 1.6rem);
    height: 1px;
    top: calc(50% - 1px);

    @screen lg {
      @apply block;
    }
  }

  .nuxt-link-active {
    @apply block text-purple;

    @screen lg {
      @apply inline-block;
    }
  }

  .menu-list {
    .menu {
      @apply p-3 font-bold cursor-pointer relative text-purple;
      transition: 0.5s all;

      &:hover {
        @apply bg-purple text-yellow;
      }

      .menu-child {
        @apply bg-white text-purple absolute right-0 mt-3 overflow-hidden;
        min-width: 300px;

        a {
          @apply block p-2 text-purple font-light text-base hover:text-pink;

          b {
            @apply text-sm font-black;
          }
        }
      }
    }

    .menu:hover .menu-child {
      @apply h-auto;
    }
  }
}

@media (max-width: 1023px) {
  #menu {
    @apply w-full h-full;
    .menu-list {
      @apply w-full;
      .menu {
        @apply text-2xl w-full;
        .menu-child {
          @apply relative;
        }
      }
    }
  }
}
</style>
