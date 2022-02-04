import Vue from 'vue'
import VueDisqus from 'vue-disqus'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

Vue.use(VueDisqus, {
  shortname: process.env.DISQUS,
})

const eventBus = {}

eventBus.install = (Vue) => {
  Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)
