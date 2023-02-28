const router = require("express").Router();
const { vrefiyAccessToken } = require("../../http/middleware/verifyAccesssToken");
const { blogAdminApiRoute } = require("./blog");
const { categoryAdminApiRoute } = require("./category");
const { productAdminApiRoute } = require("./product");

/**
 * @swagger
 *  tags:
 *      -   name : product(adminPanel)
 *          description : management of product route
 *      -   name : adminPanel
 *          description : category actions (add,edit,remove , ...)
 *      -   name : category(adminPanel)
 *          description : all method and routes about category
 *      -   name : blog(adminPanel)
 *          description : make admin panel api management
 */
router.use("/category", categoryAdminApiRoute);
router.use("/blogs", blogAdminApiRoute);
router.use("/product", productAdminApiRoute);

module.exports = {
  adminRoutes: router,
};
