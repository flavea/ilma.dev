<template>
  <div v-if="songs.length > 0">
    <a
      href="https://open.spotify.com/user/youareabsurd?si=LQ5wDByRTXuVxzsdvDVRsA"
      target="_blank"
      rel="noopener noreferrer"
      class="text-blue border-blue border-b-1 mb-3 font-bold"
    >
      {{ texts.spotify[lang] }}
    </a>
    <div
      v-for="song in songs"
      :key="song.name"
      class="flex flex-row items-center content-center mt-1"
    >
      <div v-for="img in song.image" :key="img.size">
        <img
          v-if="img.size === 'medium'"
          :src="img['#text']"
          class="mr-2 rounded-full object-cover border-blue border-4 w-16 h-16"
        />
      </div>
      <ul>
        <li v-if="song.name">
          <b>{{ song.name }}</b>
        </li>
        <li v-if="song.artist['#text']">{{ song.artist['#text'] }}</li>
        <li v-if="song.album['#text']">{{ song.album['#text'] }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [],
      texts: {
        spotify: {
          en: 'Last Played on Spotify:',
          'id-ID': 'Terakhir dimainkan:',
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
    const songs = await this.$axios.get(
      `2.0/?method=user.getrecenttracks&user=ibear2&api_key=${process.env.AUDIO_KEY}&format=json`,
      {
        baseURL: 'https://ws.audioscrobbler.com/',
      }
    )

    this.songs = songs.data.recenttracks.track.slice(0, 1)
  },
}
</script>
