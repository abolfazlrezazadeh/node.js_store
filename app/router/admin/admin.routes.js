const router = require("express").Router();
const { vrefiyAccessToken } = require("../../http/middleware/verifyAccesssToken");
const { blogAdminApiRoute } = require("./blog");
const { categoryRoutes } = require("./category");

/**
 * @swagger
 *  tags:
 *      -   name : adminPanel
 *          description : category actions (add,edit,remove , ...)
 *      -   name : category(adminPanel)
 *          description : all method and routes about category
 *      -   name : blog(adminPanel)
 *          description : make admin panel api management
 */
router.use("/category", categoryRoutes);
router.use("/blogs",vrefiyAccessToken, blogAdminApiRoute);

module.exports = {
  adminRoutes: router,
};
