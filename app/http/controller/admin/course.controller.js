const { courseModel } = require("../../../model/course");
const controller = require("../controller");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const path = require("path");
const { createCourseSchema } = require("../../validator/admin/course.schema");
const { deleteFileInPublic } = require("../../../utils/function");

class courseController extends controller {
  async getListOfCourses(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let courses;
      if (search) {
        courses = await courseModel
          .find({
            $text: {
              $search: new RegExp(search, "ig"),
            },
          })
          .sort({ _id: -1 });
      } else {
        courses = await courseModel.find({});
      }
      // sort from last to first
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        courses,
      });
    } catch (error) {
      next(error);
    }
  }
  async addCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);
      const { fileUploadPath, fileName } = req.body;
      req.body.image = path.join(fileUploadPath, fileName).replace(/\\/g, "/");
      const { title, bio, description, tags, category, price, disCount, type } =
        req.body;
      if (Number(price) > 0 && type === "free")
        throw createError.BadRequest("for free courses can not set price");
      const teacher = req.user._id;
      const image = req.body.image;
      const course = await courseModel.create({
        title,
        bio,
        description,
        tags,
        category,
        price,
        disCount,
        time: "00:00:00",
        type,
        image,
        teacher,
        status: "not started",
      });
      if (!course._id)
        throw createError.InternalServerError("Course not created");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        message: "course created successfully",
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const course = await courseModel.findById({ _id: id });
      if (!course) throw createError.NotFound("can not find the course");
      return res.status(httpStatus.OK).json({
        statuscode: httpStatus.OK,
        data: {
          course,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = {
  courseController: new courseController(),
};
