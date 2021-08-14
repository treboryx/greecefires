module.exports = {
  apps: [
    {
      name: "greecefires",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start --hostname '0.0.0.0' --port 5000",
      time: true,
      watch: true,
    }
  ]
};
