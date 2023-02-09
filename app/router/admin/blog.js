const {adminBlogController} = require("../../http/controller/admin/blog.controller");

const router = require("express").Router();
/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags : [blog(adminPanel)]
 *          summary : get all blogs
 *          responses:
 *              200:
 *                  description : success - get array of blogs
 */
router.get("/", adminBlogController.getListOfBlogs);
module.exports = {
  blogAdminApiRoute: router,
};
