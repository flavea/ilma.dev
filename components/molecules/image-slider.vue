<template>
  <div>
    <div class="navigation-wrapper relative">
      <div ref="slider" class="keen-slider">
        <div
          v-for="(img, idx) in images"
          :key="img.id"
          :class="'keen-slider__slide number-slide-' + idx"
        >
          <img
            :key="img.url"
            :src="img.url"
            class="w-full h-full object-cover"
          />
          <div
            v-if="img.caption"
            class="slide-caption absolute bg-pink text-pink p-2 uppercase text-sm font-bold w-3/4 text-center"
            v-html="img.caption"
          ></div>
        </div>
      </div>
      <svg
        v-if="images.length > 1"
        :class="{
          'arrow absolute cursor-pointer': true,
          'arrow--left': true,
          'arrow--disabled': current === 0,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style="fill: var(--pink)"
        @click="slider.prev()"
      >
        <path
          d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
        ></path>
      </svg>
      <svg
        v-if="slider && images.length > 1"
        :class="{
          arrow: true,
          'arrow--right': true,
          'arrow--disabled': current === slider.details().size - 1,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        style="fill: var(--pink)"
        @click="slider.next()"
      >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path>
      </svg>
    </div>
    <div v-if="slider && images.length > 1" class="flex py-2 justify-center">
      <button
        v-for="(slide, idx) in dotHelper"
        :key="idx"
        :class="{
          'border-none w-2 h-2 bg-gray rounded-full mx-1 p-1 cursor-pointer': true,
          active: current === idx,
        }"
        @click="slider.moveToSlideRelative(idx)"
      ></button>
    </div>
  </div>
</template>

<script>
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'

export default {
  props: {
    images: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      current: 1,
      slider: null,
    }
  },
  computed: {
    dotHelper() {
      return this.slider ? [...Array(this.slider.details().size).keys()] : []
    },
  },
  mounted() {
    this.slider = new KeenSlider(this.$refs.slider, {
      initial: this.current,
      slideChanged: (s) => {
        this.current = s.details().relativeSlide
      },
    })
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy()
  },
}
</script>

<style lang="scss" scoped>
.navigation-wrapper {
  min-height: 100px;

  .slide-caption {
    bottom: 10px;
    left: calc(15% - 10px);
  }

  .dot {
    &:focus {
      @apply outline-none;
    }
    &.active {
      @apply bg-pink;
    }
  }
}

.arrow {
  width: 30px;
  height: 30px;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  fill: #fff;

  &.arrow--left {
    left: 5px;
  }

  &.arrow--right {
    left: auto;
    right: 5px;
  }

  &.arrow--disabled {
    fill: rgba(255, 255, 255, 0.5);
  }
}
</style>
