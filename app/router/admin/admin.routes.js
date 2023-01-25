const router = require("express").Router();
const { categoryRoutes } = require("./category");

/**
 * @swagger
 *  tags:
 *      -   name : adminPanel
 *          description : category actions (add,edit,remove , ...)
 *      -   name : category(adminPanel)
 *          description : all method and routes about category
 */
router.use("/category", categoryRoutes);

module.exports = {
  adminRoutes: router,
};
