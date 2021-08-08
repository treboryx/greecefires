const Redis = require("ioredis");
const redis = new Redis({
  host: "127.0.0.1"
});

redis.on("ready", err => {
  if (err) console.log(err);
  console.log("[REDIS] Connection established");
});

const set = (key, data, expiry = 60) => {
  redis.set(key, JSON.stringify(data), "EX", expiry);
};

const get = async key => {
  return JSON.parse(await redis.get(key));
};

module.exports = { redis, set, get };
