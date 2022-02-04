import 'dayjs/locale/id'

export const formatterMixin = {
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
  methods: {
    formatDate(date) {
      let lang = this.$cookies.get('lang') || 'en'

      let format = 'dddd, MMMM  DD - HH:mm A'

      if (lang === 'id-ID') {
        lang = 'id'
        format = 'dddd, DD MMMM - HH:mm A'
      }
      return this.$dayjs(date).locale(lang).format(format)
    },
  },
}
