const redisDB = require("redis");
const redisClient = redisDB.createClient({ legacyMode: true });
redisClient.connect();
redisClient.on("connect", () => console.log("connecting to redis..."));
redisClient.on("ready", () =>
  console.log("connected to redis and ready to use")
);
redisClient.on("error", (err) => console.log("redisError " + err.message));
redisClient.on("disconnected", () => console.log("redisDB is disConnected"));

module.exports = redisClient;
