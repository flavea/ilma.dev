<template>
  <div
    class="post xl:mb-4 overflow-hidden p-4 bg-white align-top relative rounded text-center"
  >
    <nuxt-link :to="'/code/' + item.Slug">
      <span
        class="bg-pink text-white py-2 px-4 mr-2 mt-2 inline-block font-bold text-sm absolute top-1 left-0 rounded-r-full lowercase"
      >
        {{ year }}
      </span>
      <img
        v-if="item.ImageLink"
        :src="item.ImageLink"
        :alt="`Image preview for ${item.Name}`"
        class="mb-4 object-cover w-full h-48 rounded"
      />
      <img
        v-else-if="item.Images"
        :src="
          item.Images[0].replace(
            'upload/',
            'upload/q_auto,f_auto,w_475,c_scale,dpr_auto/'
          )
        "
        :alt="`Image preview for ${item.Name}`"
        class="mb-4 object-cover w-full h-48 rounded"
      />
      <img
        v-else
        :src="fallback"
        :alt="`Image preview for ${item.Name}`"
        class="mb-4 object-cover w-full h-48 rounded"
      />
      <h2 class="text-xl">{{ item.Name }}</h2>
    </nuxt-link>
    <a
      v-if="item.Code"
      :href="item.Code"
      class="button text-sm"
      rel="noreferrer"
      target="_blank"
    >
      code
    </a>
    <a
      v-if="item.PreviewLink"
      :href="
        item.PreviewLink.includes('http')
          ? item.PreviewLink
          : previewLink(item.PreviewLink)
      "
      class="button text-sm"
      rel="noreferrer"
      target="_blank"
    >
      preview
    </a>
  </div>
</template>

<script>
import { formatterMixin } from '@/helpers/formatterMixin'

export default {
  mixins: [formatterMixin],
  computed: {
    year() {
      return new Date(this.item.created_at).getFullYear()
    },
  },
  methods: {
    previewLink(file) {
      return process.env.previewUrl + file
    },
  },
}
</script>
