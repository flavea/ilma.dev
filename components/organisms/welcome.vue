<template>
  <div id="welcome" class="p-0 w-full lg:relative lg:h-screen">
    <circles class="w-64 absolute hidden lg:block" :amount="132" />
    <circles
      class="circles-2 w-64 absolute hidden lg:block"
      :amount="132"
      color="blue"
    />
    <Github
      class="absolute top-0 right-0 hidden lg:block w-1/6 m-5 text-xs text-right"
    />

    <div
      id="message"
      class="pt-14 lg:mt-0 text-pink lg:absolute md:w-3/5 lg:py-8 xl:w-1/2"
    >
      <Spotify
        class="absolute top-0 left-0 -mt-40 -ml-20 hidden xxl:block w-1/2 xlg:w-1/3 m-5 text-xs"
      />

      <Lines
        class="absolute left-0 mt-8 ml-8 z-10 hidden lg:block"
        :amount="30"
      />

      <div id="inner-message" class="p-8 pt-0 relative">
        <h1
          class="greeting text-pink md:text-yellow relative font-black text-6xl lg:text-8xl mb-3"
        >
          {{ baseInfo.Heading }}
          <span class="absolute text-yellow md:text-blue">
            {{ baseInfo.Heading }}
          </span>
        </h1>

        <div v-html="$md.render(baseInfo.Description)" />

        <nuxt-link
          :to="lang === 'en' ? '/about' : '/tentang'"
          class="button bg-yellow shadow-small-pink mt-4 inline-block"
        >
          {{ lang === 'en' ? 'read more' : 'baca lebih lanjut' }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import circles from '@/components/atoms/circles.vue'
import Lines from '@/components/atoms/lines.vue'
import Github from '@/components/molecules/github.vue'
import Spotify from '@/components/molecules/spotify.vue'

export default {
  components: { circles, Lines, Spotify, Github },
  computed: {
    baseInfo() {
      return this.$store.state.global.baseInfo
    },
    lang() {
      return this.$cookies.get('lang') || 'en'
    },
  },
}
</script>

<style lang="scss">
#welcome {
  margin-bottom: -53px;

  @screen md {
    background: url('https://res.cloudinary.com/ilma/image/upload/v1593803407/wfh_8_t1klil.svg')
      no-repeat center bottom;
    margin-bottom: 0;
    background-position: right bottom;
    background-size: 55% auto;
  }

  @screen lg {
    background-size: 55% auto;
    background-position: -50px bottom;
    height: calc(100vh - 3.4rem);
  }

  @screen xl {
    background-size: 55% auto;
    background-position: left bottom;
    height: calc(100vh - 3.4rem);
  }

  &::after {
    @apply block relative;
    background: url('https://res.cloudinary.com/ilma/image/upload/v1593803407/wfh_8_t1klil.svg')
      no-repeat center bottom;
    background-size: auto 100%;
    content: '';
    height: 300px;
    margin-top: -80px;
    z-index: 1;

    @screen md {
      @apply hidden;
    }
  }
  .circles {
    left: 10%;
    top: 5%;
  }

  .circles-2 {
    bottom: 0% !important;
    right: 15% !important;
    left: auto;
    top: auto;
  }

  #message {
    @screen lg {
      left: 40%;
      bottom: 10vh;
    }

    @screen xl {
      margin-left: -50px;
      left: 50%;
      bottom: 10vh;
    }

    #inner-message {
      background-blend-mode: hue;
      background-position: 0 40px !important;
      background-size: 100% 80% !important;
      background-repeat: no-repeat;

      &::before {
        @apply rounded-full block absolute h-64 z-10 w-screen;
        background: linear-gradient(
            180deg,
            var(--pink) 0%,
            rgba(255, 255, 255, 0) 100%
          ),
          linear-gradient(180deg, var(--yellow) 0%, rgba(255, 255, 255, 0) 100%),
          var(--blue);
        content: '';
        z-index: 1;
        top: -40%;
        left: -10vw;
        width: 120vw;

        @screen md {
          display: none !important;
        }
      }

      .greeting {
        @apply leading-none;
        margin-top: -3vh;
        z-index: 2;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: var(--blue);
        span {
          top: 5px;
          left: 5px;
          z-index: 2;
          -webkit-text-stroke-width: 0px;
        }

        @screen md {
          -webkit-text-stroke-color: var(--yellow);
        }

        @screen lg {
          -webkit-text-stroke-color: var(--blue);
        }
      }

      .button {
        @apply relative pl-24 pr-24;
        z-index: 2;
      }

      p {
        @apply relative bg-yellow inline p-1;
        z-index: 2;
        line-height: 2rem;
      }

      & > div {
        a {
          @apply bg-blue text-yellow px-2;
        }
      }
    }
  }
}
</style>
