const { courseModel } = require("../../../../model/course");
const controller = require("../../controller");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");

class chapterController extends controller {
  async addChapter(req, res, next) {
    try {
      const { id, title, text } = req.body;
      // const { id } = req.params;
      // console.log(id);
      console.log(title);
      await this.findCourseById(id);
      const saveChapter = await courseModel.updateOne(
        { _id: id },
        { $push: { chapters: { title, text, episodes: [] } } }
      );
      if (saveChapter.modifiedCount == 0)
        throw createError.InternalServerError("can not add Chapter");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "chapter added successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findCourseById(id) {
    console.log(id);
    if (!mongoose.isValidObjectId(id))
      throw createError.BadRequest("Id is not correct");
    const course = await courseModel.findById(id);
    if (!course) throw createError.NotFound("Course not found");
    return course;
  }
}

module.exports = {
  chapterController: new chapterController(),
};
