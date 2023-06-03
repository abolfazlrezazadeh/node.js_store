const { courseModel } = require("../../../../model/course");
const controller = require("../../controller");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const path = require("path");
const {
  createCourseSchema,
} = require("../../../validator/admin/course.schema");
const {
  deleteFileInPublic,
  deleteInvalidPropertyInObject,
  copyObject,
  gettalTimeOfCourses,
} = require("../../../../utils/function");
const { default: mongoose } = require("mongoose");
const { isValidObjectId } = require("mongoose");
const { IdValidator } = require("../../../validator/public.validator");

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
          .populate([
            { path: "category", select: { title: 1 } },
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, phone: 1, email: 1 },
            },
          ])
          .sort({ _id: -1 });
      } else {
        courses = await courseModel
          .find({})
          .populate([
            { path: "category", select: { title: 1 } },
            {
              path: "teacher",
              select: { first_name: 1, last_name: 1, phone: 1, email: 1 },
            },
          ])
          .sort({ _id: -1 });
      }
      // sort from last to first
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          courses,
        },
      });
    } catch (error) {
      console.log(error);
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
        throw createError.InternalServerError("creating course is failed");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "course created successfully",
        },
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
      course.time = gettalTimeOfCourses(course.chapters);
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
  async updateCourse(req, res, next) {
    try {
      const { courseId } = req.params;
      const course = await this.findCourseById(courseId);
      const data = copyObject(req.body);
      const { fileUploadPath, fileName } = req.body;
      let blackListFields = [
        "chapters",
        "episodes",
        "students",
        "time",
        "bookmark",
        "likes",
        "disLikes",
        "comment",
        "fileUploadPath",
        "fileName",
      ];
      deleteInvalidPropertyInObject(data, blackListFields);
      if (req.file) {
        data.image = path.join(fileUploadPath, fileName).replace(/\\/g, "/");
        deleteFileInPublic(course.image);
      }
      const updateCourseResult = await courseModel.updateOne(
        { _id: courseId },
        {
          $set: data,
        }
      );
      if (!updateCourseResult.modifiedCount)
        throw createError.InternalServerError("updating course is failed");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "updating course is successfull",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findCourseById(id) {
    if (!mongoose.isValidObjectId(id))
      throw createError.BadRequest("Id is not correct");
    const course = await courseModel.findById(id);
    if (!course) throw createError.NotFound("Course not found");
    return course;
  }
}

module.exports = {
  courseController: new courseController(),
};
