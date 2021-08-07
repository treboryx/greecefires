const colors = require("colors");
const Bree = require("bree");
const Cabin = require("cabin");
const Graceful = require("@ladjs/graceful");
const { Signale } = require("signale");
const path = require("path");
const { resolve } = require("path");

const cabin = new Cabin({
  axe: {
    logger: new Signale()
  }
});

const bree = new Bree({
  root: resolve("api/jobs"),
  // logger: cabin, // debugging only
  jobs: [
    {
      name: "fires",
      interval: "2h",
      timeout: false
    }
  ]
});

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] });
graceful.listen();

// start all jobs (this is the equivalent of reloading a crontab):
bree.start();
