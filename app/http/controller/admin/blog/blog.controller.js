const { createBlogSchema } = require("../../../validator/admin/blog.schema");
const controller = require("../../controller");
const {StatusCodes: httpStatus} = require("http-status-codes");
const path = require("path");
const createError = require("http-errors");
const { blogModel } = require("../../../../model/blog");
const { deleteFileInPublic } = require("../../../../utils/function");
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
      const existBlog = await blogModel.findOne({ title: title });
      if (existBlog)
        throw createError.BadRequest("the blog titlt is Repetitive");
      const blog = await blogModel.create({
        title,
        text,
        shortText,
        category,
        tags,
        image,
        author,
      });
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
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
      console.log("1");
      const author = req.user._id;
      const { id } = req.params;
      await this.findBlog({ _id: id });
      if (req?.body?.fileUploadPath && req?.body?.fileName) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.fileName);
        req.body.image = req.body.image.replace(/\\/g, "/");
      }
      const image = req.body.image;
      const data = req.body;
      console.log(data);
      let nullishData = ["", " ", "  ", "0", null, undefined, 0];
      let blackList = ["bookmark", "disLike", "like", "comment","author"];
      Object.keys(data).forEach((key) => {
        if (blackList.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0)
          data[key] = data[key].map((item) => item.trim());
        if (nullishData.includes(data[key])) delete data[key];
      });
      const updateResult = await blogModel.updateOne({ _id: id }, { $set: data });
      if(updateResult.modifiedCount == 0 ) throw createError.InternalServerError("update failed");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "the blog update successfully",
        },
      });
    } catch (error) {
      deleteFileInPublic(req?.body?.image);
      console.log(error);
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
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
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
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
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
      return res.status(httpStatus.OK).send({
        statusCode: httpStatus.OK,
        data: {
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
    if (!blog) throw createError.NotFound("blog does not exist");
    return blog;
  }
}

module.exports = {
  adminBlogController: new blogController(),
};
