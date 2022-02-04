export const state = () => ({
  baseInfo: {},
  codeCategories: [],
  postCategories: [],
  resourceCategories: [],
  links: [],
  pages: [],
})

export const mutations = {
  setData(state, data) {
    state.baseInfo = data
  },
  setCodeCategories(state, data) {
    state.codeCategories = data
  },
  setPostCategories(state, data) {
    state.postCategories = data
  },
  setResourceCategories(state, data) {
    state.resourceCategories = data
  },
  setLinks(state, data) {
    state.links = data
  },
  setPages(state, data) {
    state.pages = data
  },
}

export const actions = {
  async fetchData({ commit }) {
    const lang = (await this.$cookies.get('lang')) || 'en'

    const baseInfo = await this.$axios.get(`/web-information?_locale=${lang}`, {
      useCache: true,
    })
    const codeCategories = await this.$axios.get('/codecategories', {
      useCache: true,
    })
    const postCategories = await this.$axios.get('/postcategories', {
      useCache: true,
    })
    const resourceCategories = await this.$axios.get('/resourcecategories', {
      useCache: true,
    })
    const links = await this.$axios.get('/links', { useCache: true })
    const pages = await this.$axios.get(`/pages?_locale=${lang}`, {
      useCache: true,
    })

    commit('setData', baseInfo.data)
    commit('setCodeCategories', codeCategories.data)
    commit('setPostCategories', postCategories.data)
    commit('setResourceCategories', resourceCategories.data)
    commit('setLinks', links.data)
    commit('setPages', pages.data)
  },
}
