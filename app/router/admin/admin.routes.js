const router = require("express").Router();
const { vrefiyAccessToken } = require("../../http/middleware/verifyAccesssToken");
const { blogAdminApiRoute } = require("./blog");
const { categoryAdminApiRoute } = require("./category");
const { courseAdminApiRouter } = require("./course");
const { productAdminApiRoute } = require("./product");

/**
 * @swagger
 *  tags:
 *      -   name : (adminPanel)
 *          description : actions of admin (add,edit,remove , ...)
 *      -   name : course(adminPanel)
 *          description : managment of course actions like manage episodes, chapter and courses
 *      -   name : product(adminPanel)
 *          description : management of product route
 *      -   name : category(adminPanel)
 *          description : all method and routes about category
 *      -   name : blog(adminPanel)
 *          description : make admin panel api management
 */
router.use("/course", courseAdminApiRouter);
router.use("/category", categoryAdminApiRoute);
router.use("/blogs", blogAdminApiRoute);
router.use("/product", productAdminApiRoute);

module.exports = {
  adminRoutes: router,
};
