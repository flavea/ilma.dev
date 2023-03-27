<template>
  <div class="hidden xl:block">
    <Circles class="w-64 absolute mt-80 z-10" :amount="132" color="blue" />
    <Squares
      class="w-64 absolute mb-32 right-0 mr-40 bottom-0 z-10"
      :amount="132"
      color="pink"
    />
    <Lines class="absolute right-0 top-0 mt-10 z-10" :amount="30" />
    <Lines
      class="absolute left-0 bottom-0 ml-72 -mb-8 z-10"
      :amount="30"
      color="pink"
    />
  </div>
</template>

<script>
import Circles from '@/components/atoms/circles'
import Lines from '@/components/atoms/lines'
import Squares from '@/components/atoms/squares'

export default {
  components: {
    Circles,
    Lines,
    Squares,
  },
}
</script>
