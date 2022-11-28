const redisClient = require("../utils/redis_init");
const { homeRoutes } = require("./api");
const { userAuthRouter } = require("./user/auth");
(async () => {
  await redisClient.v4.set('key', 'value', {
    NX: true
});
  await redisClient.get("key", (err, data) => {
    console.log(data);
  });
  // await  console.log(redisClient.ping);
})();
const router = require("express").Router();
router.use("/user", userAuthRouter);
router.use("/", homeRoutes);

module.exports = {
  allRoutes: router,
};
