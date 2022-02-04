import { cacheAdapterEnhancer } from 'axios-extensions'
import LRUCache from 'lru-cache'
const ONE_DAY = 1000 * 60 * 60 * 24

const defaultCache = new LRUCache({ maxAge: ONE_DAY })

export default function ({ $axios, redirect }) {
  const defaults = $axios.defaults

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/404')
    }
    if (code === 404) {
      redirect('/404')
    }
  })

  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: true,
    cacheFlag: 'useCache',
    defaultCache,
  })
}
