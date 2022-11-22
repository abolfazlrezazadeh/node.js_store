const redisClient = require("../utils/redis_init");
const { homeRoutes } = require("./api");
const { userAuthRouter } = require("./user/auth");
(async()=>{
 await redisClient.set("key", "value");
 const value = await redisClient.get("key");
 console.log(value);
})();
const router = require("express").Router();
router.use("/user" , userAuthRouter)
router.use("/", homeRoutes);

module.exports = {
    allRoutes : router
}