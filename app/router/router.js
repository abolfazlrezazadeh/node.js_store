const { homeRoutes } = require("./api");
const { userAuthRouter } = require("./user/auth");

const router = require("express").Router();
router.use("/user" , userAuthRouter)
router.use("/", homeRoutes);

module.exports = {
    allRoutes : router
}