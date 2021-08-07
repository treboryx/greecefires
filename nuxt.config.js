import shrinkRay from "shrink-ray-current";
export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "greecefires.eu - Live map of fires in Greece!",
    htmlAttrs: {
      lang: "en",
      amp: true
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Map with fires in Greece - Φωτιες στην Ελλαδα"
      },
      {
        name: "author",
        content: "treboryx"
      },
      {
        property: "og:title",
        content: "greecefires.eu - Live map of fires in Greece!"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Map with fires in Greece - Φωτιες στην Ελλαδα"
      },
      {
        property: "og:url",
        content: "https://greecefires.eu"
      },
      {
        property: "og:site_name",
        content: "greecefires"
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "greecefires.eu - Live map of fires in Greece!"
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Map with fires in Greece - Φωτιες στην Ελλαδα"
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://greecefires.eu/img.jpg"
      },
      {
        hid: "twitter:image:alt",
        name: "twitter:image:alt",
        content: "https://greecefires.eu/img.jpg"
      },
      {
        poperty: "twitter:card",
        content: "summary_large_image"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://greecefires.eu/img.jpg"
      },
      {
        property: "og:image:width",
        content: "1920"
      },
      {
        property: "og:image:height",
        content: "1080"
      },
      {
        hid: "og:image:secure_url",
        property: "og:image:secure_url",
        content: "https://greecefires.eu/img.jpg"
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: "https://greecefires.eu/img.jpg"
      },
      {
        hid: "theme-color",
        name: "theme-color",
        content: "#109E92"
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "Ελλαδα, Greece, Φωτιες, Fires, wildfires"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Global CSS
   */
  css: [],

  loading: {
    color: "#109E92"
  },

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: "@/plugins/google-maps" },
    { src: "@/plugins/ga.js", mode: "client" }
  ],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/tailwindcss"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://http.nuxtjs.org
  ],

  /*
   ** Server Middleware
   */
  serverMiddleware: [{ route: "/api", handler: "~/api/index.js" }],
  /*
   ** For deployment you might want to edit host and port
   */
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: { transpile: [/^vue2-google-maps($|\/)/] },
  env: {
    VUE_APP_GOOGLE_MAPS_API_KEY:
      process.env.NODE_ENV === "development"
        ? process.env.VUE_APP_GOOGLE_MAPS_API_KEY
        : "AIzaSyBg4wE12cEcuWJGQMbKNnb6m2CUTydSZSY"
  },

  /*
   ** Use brotli compression
   */
  render: {
    compressor: shrinkRay()
  }
};
