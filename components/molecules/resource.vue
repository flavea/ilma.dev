<template>
  <div
    class="post xl:mb-4 overflow-hidden p-4 bg-white align-top relative rounded text-center"
  >
    <a :href="item.Download" rel="noreferrer" target="_blank">
      <img
        v-if="item.Image"
        :src="
          item.Image.replace(
            'upload/',
            'upload/q_auto,f_auto,w_475,c_scale,dpr_auto/'
          )
        "
        :alt="`Image preview for ${item.Name}`"
        class="mb-4 object-cover w-full h-48"
      />
      <img v-else :src="fallback" :alt="`Image preview for ${item.Name}`" />
      <h3 class="text-2xl">{{ item.Name }}</h3>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    fallback() {
      return process.env.cover.replace('w_auto', 'w_476')
    },
  },
}
</script>
