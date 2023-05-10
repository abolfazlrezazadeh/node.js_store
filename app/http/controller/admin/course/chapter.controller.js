const { courseModel } = require("../../../../model/course");
const controller = require("../../controller");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { courseController } = require("./course.controller");

class chapterController extends controller {
  async addChapter(req, res, next) {
    try {
      const { id, title, text } = req.body;
      // const { id } = req.params;
      // console.log(id);
      await courseController.findCourseById(id);
      const saveChapter = await courseModel.updateOne(
        { _id: id },
        { $push: { chapters: { title, text, episodes: [] } } }
      );
      if (saveChapter.modifiedCount == 0)
        throw createError.InternalServerError("could't add Chapter");
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
  async listOfChapters(req, res, next) {
    try {
      const { courseId } = req.params;
      console.log(courseId);
      const course = await this.findChaptersOfCourse(courseId);
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          course,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findChaptersOfCourse(id) {
    const chapters = await courseModel.findOne(
      { _id: id },
      { chapters: 1, title: 1 }
    );
    if (!chapters)
      throw createError.NotFound("can not found course with this Id");
    return chapters;
  }
}

module.exports = {
  chapterController: new chapterController(),
};
