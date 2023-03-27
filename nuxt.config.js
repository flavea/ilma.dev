import path from 'path'

const cover =
  'https://res.cloudinary.com/ilma/image/upload/q_auto,f_auto,w_auto,c_scale,dpr_auto/cover_wiph1x.jpg'

export default {
  mode: 'universal',
  env: {
    cover,
    previewUrl: 'https://preview.ilma.dev/',
    url: 'https://ilma.dev/',
    ...process.env,
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'home',
    titleTemplate: '%s | ilma.dev 🐣',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'robots',
        content: 'index, follow',
      },
      {
        'http-equiv': 'Accept-CH',
        content: 'DPR, width',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Hello! I am Ilma, a web developer based in Indonesia.',
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '',
      },
      {
        name: 'subject',
        content: 'Web Development',
      },
      {
        name: 'rating',
        content: 'General',
      },
      {
        name: 'author',
        content: 'Ilma Arifiany',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      {
        name: 'og:type',
        content: 'article',
      },
      {
        name: 'subject',
        content: 'Web Development',
      },
      {
        name: 'rating',
        content: 'General',
      },
      {
        name: 'author',
        content: 'Ilma Arifiany',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      {
        name: 'og:type',
        content: 'article',
      },
      {
        hid: 'ogtitle',
        name: 'og:title',
        content: 'Ilma A',
      },
      {
        hid: 'ogimage',
        name: 'og:image',
        content: cover,
      },
      {
        hid: 'ogdescription',
        name: 'og:description',
        content: 'Hello! I am Ilma, a web developer based in Jakarta.',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: '@iarifiany',
      },
      {
        name: 'twitter:creator',
        content: '@iarifiany',
      },
      {
        hid: 'twittertitle',
        name: 'twitter:title',
        content: 'Ilma A',
      },
      {
        hid: 'twitterdescription',
        name: 'twitter:description',
        content: 'Hello! I am Ilma, a web developer based in Jakarta.',
      },
      {
        hid: 'twitterimage',
        name: 'twitter:image',
        content: cover,
      },
      {
        name: 'theme-color',
        content: '#666396',
      },
      {
        name: 'google-site-verification',
        content: 'R1AJmpriHPv9KnGMvbKBGg0lKXx7HRBbcNDeC9QUSZs',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://ilma.dev/favicon.ico',
      },
      {
        rel: 'stylesheet',
        crossorigin: 'anonymous',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/brands.min.css',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800;900&display=swap',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#666396',
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~plugins/main.js', '~plugins/axios.js', '~/plugins/prism'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/web-vitals',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    '@nuxtjs/markdownit',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-44755840-3',
      },
    ],
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    [
      'nuxt-lazy-load',
      {
        defaultImage: '/default-image.webp',
      },
    ],
  ],
  googleAnalytics: {
    id: 'UA-44755840-3',
  },
  markdownit: {
    injected: true,
    preset: 'default',
    breaks: true,
    html: true,
    linkify: true,
    typographer: true,
    quotes: '“”‘’',
    use: [
      [
        'markdown-it-anchor',
        {
          level: 1,
          // slugify: string => string,
          permalink: true,
          // renderPermalink: (slug, opts, state, permalink) => {},
          permalinkClass: 'header-anchor',
          permalinkSymbol: '¶ ',
          permalinkBefore: true,
        },
      ],
      'markdown-it-attrs',
      'markdown-it-div',
      'markdown-it-toc-done-right',
      'markdown-it-emoji',
    ],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL,
    progress: true,
  },
  googleFonts: {
    families: {
      Inter: true,
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
  },
  /*
   ** Build configuration
   */
  build: {
    analyze: false,
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
    postcss: {
      plugins: {
        tailwindcss: path.resolve('./tailwind.config.js'),
      },
      preset: {
        autoprefixer: {
          grid: true,
        },
      },
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        name: true,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    extractCSS: true,
  },
}
