import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: { analyze: true, },
  ssr:true,
  target:"server",
  components: [{ path: '@/components/', pathPrefix: false }],
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'components/NotFound.vue')
      })
    }
  }
})
