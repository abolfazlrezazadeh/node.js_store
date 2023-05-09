const blogController = require("../../http/controller/admin/blog/blog.controller");
const {adminBlogController} = require("../../http/controller/admin/blog/blog.controller");
const { StringToArray } = require("../../http/middleware/stringatoArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/", adminBlogController.getListOfBlogs);

router.post("/add",uploadFile.single("image"),StringToArray("tags"), adminBlogController.createBlog);

router.patch("/update/:id",uploadFile.single("image"),StringToArray("tags"), adminBlogController.updateBlog);

router.get("/:id",adminBlogController.getOneBlogById);

router.delete("/remove/:id",adminBlogController.deleteBlog);
module.exports = {
  blogAdminApiRoute: router,
};
