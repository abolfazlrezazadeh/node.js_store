const { courseModel } = require("../../../model/course");
const controller = require("../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");

class courseController extends controller {
  async getListOfCourses(req, res, next) {
    try {
      const courses = await courseModel.find({}).sort({ _id: -1 }); // sort from last to first
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        courses,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  courseController: new courseController(),
};
