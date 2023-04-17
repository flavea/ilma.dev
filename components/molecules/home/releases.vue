<template>
  <div id="releases" class="m-4 md:m-0 lg:mr-8 lg:mb-8">
    <div class="title font-black">
      <span
        class="bg-blue text-pink p-4 md:bg-yellow md:text-pink rounded-tr-lg rounded-tl-lg"
      >
        {{ titles[lang] }}
      </span>
    </div>

    <div id="releases-content" class="mt-4 flex justify-center items-center">
      <div
        v-for="(code, index) in codes"
        :key="code.id"
        :class="{
          'rounded-tr-lg rounded-b-lg': index === 0,
          'rounded-lg': index > 0,
        }"
        class="release clearfix p-2 border-blue md:border-yellow border-1 bg-white lg:bg-pink w-full font-black md:mr-4"
      >
        <nuxt-link :to="'code/' + code.Slug">
          <img
            v-if="code.ImageLink"
            :src="code.ImageLink"
            :alt="`Image preview for ${code.Name}`"
            class="mb-2 object-cover w-full h-48 rounded-lg"
          />

          <img
            v-else-if="code.Images"
            :src="
              code.Images[0].replace(
                'upload/',
                'upload/q_auto,f_auto,w_475,c_scale,dpr_auto/'
              )
            "
            :alt="`Image preview for ${code.Name}`"
            class="mb-2 object-cover w-full h-48 rounded-lg"
          />
          <img
            v-else
            :src="fallback"
            :alt="`Image preview for ${code.Name}`"
            class="mb-2 object-cover w-full h-48 rounded-lg"
          />
        </nuxt-link>
        <div
          class="p-1 text-pink lg:text-yellow flex items-center justify-between"
        >
          <span>
            {{ code.Name }}
          </span>
          <div class="text-right">
            <nuxt-link
              v-for="cat in code.Categories"
              :key="cat.id"
              :to="`/codes/${cat.Slug}`"
              class="bg-blue text-pink p-1 mb-1 text-xs ml-1 rounded-sm"
            >
              {{ cat.Name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    codes: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      titles: {
        en: 'Latest Releases',
        'id-ID': 'Kode Terbaru',
      },
    }
  },
  computed: {
    lang() {
      return this.$cookies.get('lang') || 'en'
    },
  },
  methods: {
    getNumber(idx) {
      if (parseInt(idx) > 10) {
        return idx
      } else {
        return `0${idx + 1}`
      }
    },
  },
}
</script>

<style lang="scss">
#releases {
  #releases-content {
    .release {
      @screen lg {
        display: block !important;
      }

      &:last-child {
        @apply mr-0;

        @screen md {
          @apply hidden;
        }

        @screen xl {
          @apply block;
        }
      }

      &:not(:first-child) {
        @apply hidden;
      }

      @screen md {
        &:not(:last-child) {
          @apply block;
        }
      }
    }
  }

  & > div {
    @apply relative;
    z-index: 1;
  }
}
</style>
