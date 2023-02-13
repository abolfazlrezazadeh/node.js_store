const { createBlogSchema } = require("../../validator/admin/blog.schema");
const controller = require("../controller");
const path = require("path");
const { blogModel } = require("../../../model/blog");
const { deleteFileInPublic } = require("../../../utils/function");
class blogController extends controller {
  async createBlog(req, res, next) {
    try {
      const blogDateBody = await createBlogSchema.validateAsync(req.body);
      const {title,text,shortText,category,tags} = blogDateBody;
      const image = req.body.image;
      req.body.image = path.join(blogDateBody.fileUploadPath, blogDateBody.fileName);
      req.body.image = req.body.image.replace(/\\/g,"/");
      const blog = await blogModel.create({title,text,shortText,category,tags,image})
      return res.json({ blog });
    } catch (error) {
      deleteFileInPublic(req.body.image)
      next(error);
    }
  }
  async updateBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deleteBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getOneBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      // console.log("1");
      return res.status(200).send({
        statusCode: 200,
        data: {
          blogs: [],
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  adminBlogController: new blogController(),
};
