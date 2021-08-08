const colors = require("colors");
const Bree = require("bree");
const Cabin = require("cabin");
const Graceful = require("@ladjs/graceful");
const { Signale } = require("signale");
const path = require("path");
const { resolve } = require("path");
const express = require("express");
const { get } = require("./redis");
const app = express();

app.get("/", async (req, res) => {
  const cache = await get("fires");
  res
    .status(200)
    .json({ count: cache ? cache.length : 0, data: cache ? cache : [] });
});

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
      timeout: false,
      interval: "2h"
    }
  ]
});

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] });
graceful.listen();

// start all jobs (this is the equivalent of reloading a crontab):
bree.start();

module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
