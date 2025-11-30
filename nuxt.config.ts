// https://nuxt.com/docs/api/configuration/nuxt-config

import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@vueform/nuxt', '@nuxtjs/google-fonts','@pinia/nuxt',],
  // @ts-expect-error: googleFonts config is provided by @nuxtjs/google-fonts module
  googleFonts: {
    families: {
      Inter: [400, 700]
    },
    display: 'swap',
    prefetch: true,
    preload: true,
    preconnect: true
  },
  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url)),
    '~': fileURLToPath(new URL('./', import.meta.url)), // optional
  },
  css: ['~~/assets/css/tailwind.css'],
  routeRules: {
    '/': { redirect: '/auth' }
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    
    // Public keys (exposed to client-side)
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:5000',
      appName: 'Online Market'
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Online Market',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'description', name: 'description', content: 'Online Market - Your digital marketplace' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Server-side rendering
  ssr: true,

  // Development server configuration
  devServer: {
    port: 3000
  }
})