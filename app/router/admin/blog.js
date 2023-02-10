const {adminBlogController} = require("../../http/controller/admin/blog.controller");
const { StringToArray } = require("../../http/middleware/stringatoArray");
const { uploadFile } = require("../../utils/multer");

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
/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags : [blog(adminPanel)]
 *          summary : create blog
 *          consumer:
 *              - multipart/form-data
 *              - 
 *          parameters:
 *              -   in: formData
 *                  name : title
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name : text
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name : shortText
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name: tags
 *                  example: tag#tag2#
 *                  type: string
 *                  required : false
 *              -   in: formData
 *                  name : category
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name : image
 *                  type: file
 *                  required : true
 * 
 *          responses:
 *              200:
 *                  description : success 
 */
router.post("/add",uploadFile.single("image"),StringToArray("tags"), adminBlogController.createBlog);
module.exports = {
  blogAdminApiRoute: router,
};
