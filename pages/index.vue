<template>
  <div>
    <Welcome :codes="latestCodes" :posts="latestPosts" />
    <div
      id="wave"
      class="h-32 md:h-64 bg-pink lg:bg-purple"
    />
  </div>
</template>

<script>
import { searchClient } from '@/helpers/algolia'
import Welcome from '@/components/organisms/welcome.vue'

export default {
  components: { Welcome },
  transition: 'default',
  async asyncData({ app }) {
    const lang = app.$cookies.get('lang') || 'en'
    const postIndex = searchClient.initIndex('staging_posts')
    const codeIndex = searchClient.initIndex('staging_codes')

    const latestPosts = await postIndex
      .search('', { hitsPerPage: 10, facetFilters: ['locale:' + lang] })
      .then(({ hits }) => {
        return hits
      })

    let opt = {
      hitsPerPage: 3,
      facetFilters: ['locale:' + lang],
    }

    if (lang !== 'en')
      opt = {
        ...opt,
        facetFilters: ['localizations.locale:' + lang],
        filters: 'NOT locale:' + lang,
      }

    const latestCodes = await codeIndex.search('', opt).then(({ hits }) => {
      return hits
    })

    return {
      latestCodes,
      latestPosts,
    }
  },
  data() {
    return {
      latestCodes: [],
      latestPosts: [],
    }
  },
}
</script>

<style lang="scss">
#summary {
  .circles {
    left: 10%;
    z-index: 0;
    top: 0;
    .c {
      @apply border-yellow;
    }
  }

  .lines-pink {
    bottom: -20px;
    right: 5%;
  }

  .title {
    margin-bottom: -2px;
  }

  #inner-summ {
    #releases {
      #releases-content {
        .release:last-child {
          @apply mr-0;
        }
        .release:not(:first-child) {
          @apply hidden;
        }
      }
      & > div {
        @apply relative;
        z-index: 1;
      }
    }

    #bposts {
      #posts {
        height: calc(100% - 56px);
        .date {
          color: #818181;
        }
        .number {
          @apply transform -rotate-12;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  #summary {
    #inner-summ {
      @apply m-auto;
      max-width: 1000px;

      #releases {
        @apply m-0;
        #releases-content {
          .release:not(:last-child) {
            @apply block;
          }

          .release:last-child {
            @apply mr-0 hidden;
          }
        }
      }

      h1 {
        font-size: 1.4rem;
      }
    }
  }
}

@screen lg {
  #summary {
    #inner-summ {
      max-width: 1280px;
      grid-template-columns: 0.5fr 1.5fr;

      #releases {
        @apply mb-8;
        #releases-content {
          .release {
            display: block !important;
          }
        }
      }

      h1 {
        font-size: 1.6rem;
      }
    }
  }
}

@screen xl {
  #summary {
    #inner-summ {
      max-width: 1280px;
      grid-template-columns: 0.5fr 1.5fr;

      #releases {
        #releases-content {
          .release:last-child {
            @apply block;
          }
        }
      }

      h1 {
        font-size: 1.6rem;
      }
    }
  }
}

#wave {
  margin: 0;
  background-image: url('/wave-2.svg');
  background-size: cover;

  @screen lg {
    background-image: url('/wave-3.svg');
  }
}
</style>
