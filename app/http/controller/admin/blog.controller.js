const controller = require("../controller");
class blogController extends controller {
  async createBlog(req, res, next) {
    try {
    } catch (error) {
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
