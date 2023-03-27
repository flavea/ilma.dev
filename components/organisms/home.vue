<template>
  <div
    id="summary"
    class="p-0 bg-transparent h-full relative md:p-8 lg:p-24 lg:bg-purple"
  >
    <Circles
      :amount="132"
      class="w-64 absolute hidden lg:block z-0 top-0"
      color="yellow"
    />
    <Lines :amount="30" class="absolute z-0 hidden lg:block" color="pink" />

    <div
      id="inner-summ"
      class="block md:m-auto lg:max-w-4xl xl:max-w-5xl xxl:max-w-6xl"
    >
      <Releases :codes="codes" />
      <Posts :posts="posts" />
    </div>
  </div>
</template>

<script>
import Lines from '@/components/atoms/lines.vue'
import Circles from '@/components/atoms/circles.vue'
import Releases from '@/components/molecules/home/releases.vue'
import Posts from '@/components/molecules/home/posts.vue'

export default {
  components: { Lines, Circles, Releases, Posts },
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
}
</script>

<style lang="scss">
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
