<template>
  <div
    class="post mb-4 overflow-hidden p-4 bg-white align-top relative rounded-lg"
  >
    <span
      v-if="item.Link"
      class="bg-pink text-white py-2 px-4 ml-2 mt-2 inline-block font-bold text-sm absolute top-0 right-0 rounded-l-full lowercase"
    >
      External Link
    </span>
    <nuxt-link v-if="!item.Link" :to="'/post/' + item.Slug">
      <h1 class="text-2xl">{{ item.Title }}</h1>
    </nuxt-link>
    <a v-else :href="item.Link" target="_blank" rel="noreferrer">
      <h1 class="text-2xl">{{ item.Title }}</h1>
    </a>
    <div class="date text-gray">
      {{ formatDate(item.created_at) }}
    </div>
    <div class="block lg:flex flex-row">
      <img
        v-if="item.Image"
        :src="
          item.Image.replace(
            'upload/',
            'upload/q_auto,f_auto,w_475,c_scale,dpr_auto/'
          )
        "
        :alt="`Image preview for ${item.Title}`"
        class="mb-4 object-cover h-40 w-full lg:w-64 mr-4 mt-4"
      />
      <div>
        <p>{{ item.Snippet }}</p>
      </div>
    </div>
    <div class="tags mt-4 w-full overflow-hidden">
      <nuxt-link
        v-for="category in item.Categories"
        :key="category.Slug"
        :to="category.Slug"
        class="bg-yellow text-purple py-2 px-4 mr-2 mt-2 inline-block font-bold text-sm rounded-full lowercase"
      >
        {{ category.Name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { formatterMixin } from '@/helpers/formatterMixin'

export default {
  mixins: [formatterMixin],
}
</script>
