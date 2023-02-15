const blogController = require("../../http/controller/admin/blog.controller");
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
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2NDQ0NDkyLCJleHAiOjE2NzY1MzA4OTJ9.HaVs3Q_cRJNSaTLFcfgRZCz4xxV0eCGRYgvZrtANtLM            
 * 
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
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2MzU3MjcwLCJleHAiOjE2NzY0NDM2NzB9.h083XbajglNGp-ohZpb9eYu5FWm3f5XmXyVri8yYDFk
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
/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *         tags : [blog(adminPanel)]
 *         summary : get blog By id and populate this field
 *         parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2NDQ0NDkyLCJleHAiOjE2NzY1MzA4OTJ9.HaVs3Q_cRJNSaTLFcfgRZCz4xxV0eCGRYgvZrtANtLM            
 *              -    in: path
 *                   type: string
 *                   required : true
 *                   name : id
 *         responses:
 *              200:
 *                 description : successful
 *              404:
 *                 description: not successful
 */
router.get("/:id",adminBlogController.getOneBlogById);
/**
 * @swagger
 *  /admin/blogs/remove/{id}:
 *      delete:
 *         tags : [blog(adminPanel)]
 *         summary : delete blog By id 
 *         parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2NDQ0NDkyLCJleHAiOjE2NzY1MzA4OTJ9.HaVs3Q_cRJNSaTLFcfgRZCz4xxV0eCGRYgvZrtANtLM            
 *              -    in: path
 *                   type: string
 *                   required : true
 *                   name : id
 *         responses:
 *              200:
 *                 description : successful
 *              404:
 *                 description: not successful
 */
router.delete("/remove/:id",adminBlogController.deleteBlog);
module.exports = {
  blogAdminApiRoute: router,
};