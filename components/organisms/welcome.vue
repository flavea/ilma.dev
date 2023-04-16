<template>
  <div id="welcome" class="p-0 w-full lg:relative lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
    <div id="illust">
      <Circles class="w-64 absolute hidden lg:block" :amount="132" />
      <div id="image" class="h-screen hidden lg:block" />
      <Posts :posts="posts" />
      <div
        id="summary"
        class="p-0 bg-transparent hidden lg:block h-full relative md:p-8 lg:p-24 lg:bg-purple w-screen"
      >
        <Circles
          :amount="132"
          class="w-64 absolute hidden lg:block z-0"
          color="yellow"
          style="top: 10%"
        />
        <Squares
          class="w-64 absolute hidden lg:block z-0 rotate-45"
          :amount="132"
          color="pink"
          style="top: 20%; left: 20%"
        />
        <Lines :amount="30" class="absolute z-0 hidden lg:block" color="pink" />
      </div>
    </div>
    <div id="content">
      <Github
        class="absolute top-0 right-0 hidden lg:block w-1/6 m-5 text-xs"
      />

      <Circles
        class="circles-2 w-64 absolute hidden lg:block"
        :amount="132"
        color="blue"
      />
      <div
        id="message"
        class="lg:mt-40 text-pink lg:py-8"
      >
        <Spotify
          class="hidden xxl:block w-1/2 xlg:w-1/3 m-5 text-xs mb-5"
        />

        <div id="inner-message" class="p-4 md:p-8 pt-0 relative mt-10 md:pb-0">
          <Lines
            class="absolute left-0 mt-8 ml-8 z-0 hidden lg:block"
            :amount="30"
          />
          <h1
            class="greeting text-pink relative font-black text-6xl lg:text-8xl mb-3"
          >
            {{ baseInfo.Heading }}
            <span class="absolute text-yellow ">
              {{ baseInfo.Heading }}
            </span>
          </h1>

          <div class="mb-10" v-html="$md.render(baseInfo.Description)" />

          <Releases :codes="codes" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Squares from '@/components/atoms/squares.vue'
import Circles from '@/components/atoms/circles.vue'
import Lines from '@/components/atoms/lines.vue'
import Github from '@/components/molecules/github.vue'
import Spotify from '@/components/molecules/spotify.vue'
import Releases from '@/components/molecules/home/releases.vue'
import Posts from '@/components/molecules/home/posts.vue'

export default {
  components: { Circles, Lines, Spotify, Github, Releases, Posts, Squares },
  props: {
    codes: {
      type: Array,
      default: () => {
        return []
      },
    },
    posts: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
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
  #illust {
    order: 2;

    @screen lg {
      order: 1;
    }

    #image {
      @screen md {
        background-image: url('/wfh.svg');
        margin-bottom: 0;
        background-repeat: no-repeat;
        background-position: right bottom;
        background-size: auto 100%;
      }

      @screen lg {
        background-size: 100% auto;
        background-position: left bottom;
      }
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

      .greeting {
        @apply leading-none;
        margin-top: -3vh;
        z-index: 2;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: var(--purple);
        span {
          top: 5px;
          left: 5px;
          z-index: 2;
          -webkit-text-stroke-color: var(--purple);
        }

        @screen md {
          -webkit-text-stroke-color: var(--purple);
        }

        @screen lg {
          -webkit-text-stroke-color: var(--purple);
        }
      }

      .button {
        @apply relative pl-24 pr-24;
        z-index: 2;
      }

      p {
        @apply relative bg-purple text-yellow inline p-1;
        z-index: 2;
        line-height: 2rem;
      }

    }
  }
}

#content {
  order: 1;
  @screen lg {
    order: 2;
  }
}


#summary {
    background-image: url('/wave-2.svg');
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: 100% auto;

  @screen lg {
    background-image: url('/wave.svg'), url('/wave-2.svg');
    background-position: top, bottom;
  }

  .circles {
    left: 10%;
  }

  .lines {
    bottom: -20px;
    right: 5%;
  }

  .title {
    margin-bottom: -2px;
  }
}
</style>
