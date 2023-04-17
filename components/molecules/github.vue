<template>
  <div v-if="githubData.repo">
    <b class="text-pink border-pink border-b-1 mb-3">
      {{ texts.github[lang] }}
    </b>
    <ul class="mt-1 text-left">
      <li>
        <b>Repo:</b>
        <a
          :href="githubData.repo.url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ githubData.repo.name }}
        </a>
      </li>
      <li>
        <b>Commit:</b>
        <a :href="githubData.payload.commits[0].url" target="_blank">
          {{ githubData.payload.commits[0].message }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      githubData: [],
      texts: {
        github: {
          en: 'Latest Commit:',
          'id-ID': 'Commit Terbaru:',
        },
      },
    }
  },
  computed: {
    lang() {
      return this.$cookies.get('lang') || 'en'
    },
  },
  async mounted() {
    const github = await this.$axios.get('/users/flavea/events', {
      baseURL: 'https://api.github.com',
    })

    const commits = github.data.filter((e) => e.type === 'PushEvent')
    this.githubData = commits.length > 0 ? commits[0] : {}
  },
}
</script>
