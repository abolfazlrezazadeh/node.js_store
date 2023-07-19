const { graphqlHTTP } = require("express-graphql");
const {
  vrefiyAccessToken,
  checkRole,
} = require("../http/middleware/verifyAccesssToken");
const redisClient = require("../utils/redis_init");
const { adminRoutes } = require("./admin/admin.routes");
const { homeRoutes } = require("./api");
const { developerRoute } = require("./developer.routes");
const { graphqlSchema } = require("./../graphql/index.graphQL");
const { userAuthRouter } = require("./user/auth");
const { configGraphql } = require("../utils/graphql.config");
(async () => {
  await redisClient.v4.set("key", "value", {
    NX: true,
  });
  await redisClient.get("key", (err, data) => {
    // console.log(err);
    console.log(data);
  });
  // await  console.log(redisClient.ping);
})();
const router = require("express").Router();
router.use("/user", userAuthRouter);
router.use("/admin", vrefiyAccessToken, adminRoutes);
router.use("/developer", developerRoute);
router.use("/graphql", graphqlHTTP(configGraphql));
router.use("/", homeRoutes);

module.exports = {
  allRoutes: router,
};
