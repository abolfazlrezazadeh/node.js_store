const { createBlogSchema } = require("../../validator/admin/blog.schema");
const controller = require("../controller");
const path = require("path");
const createError = require("http-errors");
const { blogModel } = require("../../../model/blog");
const { deleteFileInPublic } = require("../../../utils/function");
class blogController extends controller {
  async createBlog(req, res, next) {
    try {
      const blogDateBody = await createBlogSchema.validateAsync(req.body);
      const { title, text, shortText, category, tags } = blogDateBody;
      req.body.image = path.join(
        blogDateBody.fileUploadPath,
        blogDateBody.fileName
      );
      req.body.image = req.body.image.replace(/\\/g, "/");
      const author = req.user._id;
      const image = req.body.image;
      const blog = await blogModel.create({
        title,
        text,
        shortText,
        category,
        tags,
        image,
        author,
      });
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "the blog creat successfully",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
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
      const { id } = req.params;
      await this.findBlog({ _id: id });
      const result = await blogModel.deleteOne({ _id: id });
      if (result.deletedCount == 0)
        throw createError.InternalServerError("cant delete blog");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "blog already deleted",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getOneBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await blogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        { $unwind: "$author" },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        { $unwind: "$category" },
        {
          $project: {
            "author.phone": 0,
            "author.roles": 0,
            "author.bills": 0,
            "author.disCount": 0,
            "author.__v": 0,
            "category.__v": 0,
            "author.otp": 0,
          },
        },
      ]);
      return res.status(200).send({
        data: {
          statusCode: 200,
          blogs,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async findBlog(query) {
    const blog = await blogModel.findOne(query).populate([
      { path: "category", select: ["title"] },
      {
        path: "author",
        select: ["phone", "first_name", "last_name", "username"],
      },
    ]);
    if(!blog) throw createError.NotFound("blog does not exist");
    return blog;
  }
}

module.exports = {
  adminBlogController: new blogController(),
};
