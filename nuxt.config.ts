// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      link: [
        { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"},
        { rel:"preconnect", href: "https://fonts.googleapis.com"},
        { rel:"preconnect", href: "https://fonts.gstatic.com"},
        { href:"https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap", rel:"stylesheet"},
      ]
    }
  },

  modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt" ]
})