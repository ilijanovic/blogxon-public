import { config } from './config'
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Blogxon - Blog posts all about MEVN stack and more!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      {
        hid: 'description',
        name: 'description',
        content:
          'Welcome to my blog. Here you will find everything about Vue.js, Nuxt.js, Express.js and more!',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favico.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/axios', '@/plugins/blogxon'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],

  markdownit: {
    injected: true,
    preset: 'default',
    linkify: true,
    breaks: true,
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    '@tui-nuxt/editor',
  ],
  workbox: {
    importScripts: ['custom-sw.js'],
  },
  pwa: {
    manifest: {
      name: 'Blogxon',
      short_name: 'BL',
      lang: 'en',
      description: 'Blog around web development',
      display: 'standalone',
      background_color: 'white',
      theme_color: '#34495e',
      icons: [
        {
          src: '/icon.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icon_192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon_168.png',
          sizes: '168x168',
          type: 'image/png',
        },
        {
          src: '/icon_144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: '/icon_96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: '/icon_72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: '/icon_48.png',
          sizes: '48x48',
          type: 'image/png',
        },
      ],
    },
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)

  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? config.domain
        : `http://localhost:${config.port}`,
  },
  serverMiddleware: ['~api/index'],
  server: {
    host: config.host,
    port: config.port,
  },
}
