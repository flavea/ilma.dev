export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, isDev }) {
    await dispatch('global/fetchData')
  },
}
