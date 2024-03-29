const { default: getVideoDurationInSeconds } = require("get-video-duration");
const {
  createEpisodeSchema,
} = require("../../../validator/admin/course.schema");
const controller = require("../../controller");
const path = require("path");
const {
  getTime,
  deleteInvalidPropertyInObject,
  copyObject,
} = require("../../../../utils/function");
const { courseModel } = require("../../../../model/course");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { IdValidator } = require("../../../validator/public.validator");

class episodeController extends controller {
  async addNewEpisode(req, res, next) {
    try {
      const {
        type,
        title,
        text,
        chapterId,
        courseId,
        fileUploadPath,
        fileName,
      } = await createEpisodeSchema.validateAsync(req.body);
      const videoAddress = path
        .join(fileUploadPath, fileName)
        .replace(/\\/g, "/");
      console.log(videoAddress);
      const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
      //package for get video time in second
      const second = await getVideoDurationInSeconds(videoUrl);
      //get time return seconds in 00:00:00 format
      const time = getTime(second);
      const episode = {
        type,
        title,
        text,
        time,
        videoAddress,
      };
      const createEpisodeResult = await courseModel.updateOne(
        { _id: courseId, "chapters._id": chapterId },
        {
          $push: {
            "chapters.$.episodes": episode,
          },
        }
      );
      if (createEpisodeResult.modifiedCount == 0)
        throw createError.InternalServerError("adding episode is failed");
      return res.status(httpStatus.OK).json({
        StatusCodes: httpStatus.OK,
        data: {
          message: "adding episde is successfull",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeEpisodeById(req, res, next) {
    try {
      const { id: episodeId } = await IdValidator.validateAsync({
        id: req.params.episodeId,
      });
      await this.getOneEpisodeInChapter(episodeId);
      const removeEpisodeById = await courseModel.updateOne(
        { "chapters.episodes._id": episodeId },
        {
          $pull: {
            "chapters.$.episodes": {
              _id: episodeId,
            },
          },
        }
      );
      if (removeEpisodeById.modifiedCount == 0)
        throw createError.InternalServerError("deleting episode is failed");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "deleting episode is successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateEpisode(req, res, next) {
    try {
      const { episodeId } = req.params;
      const episode = await this.getOneEpisodeInChapter(episodeId);
      let blackListFields = ["._id"];
      const { fileUploadPath, fileName } = req.body;
      if (fileUploadPath && fileName) {
        const fileAddress = path.join(fileUploadPath, fileName);
        req.body.videoAddress = fileAddress.replace(/\\/g, "/");
        const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`;
        //package for get video time in second
        const second = await getVideoDurationInSeconds(videoUrl);
        //get time return seconds in 00:00:00 format
        req.body.time = getTime(second);
        blackListFields.push("fileName");
        blackListFields.push("fileUploadPath");
      } else {
        blackListFields.push("time");
        blackListFields.push("videoAddress");
      }
      const data = req.body;
      deleteInvalidPropertyInObject(data, blackListFields);
      const newEpisode = {
        ...episode,
        ...data,
      };
      const createEpisodeResult = await courseModel.updateOne(
        { "chapters.episodes._id": episodeId },
        {
          $set: {
            "chapters.$.episodes": newEpisode,
          },
        }
      );
      if (!createEpisodeResult.modifiedCount)
        throw createError.InternalServerError("updating episode is failed");
      return res.status(httpStatus.OK).json({
        StatusCodes: httpStatus.OK,
        data: {
          message: "updating episde is successfull",
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getOneEpisodeInChapter(episodeId) {
    const course = await courseModel.findOne(
      { "chapters.episodes._id": episodeId },
      { "chapters.episodes": 1 }
    );
    if (!course)
      throw createError.NotFound("No episode was found with this Id");
    const episode = await course?.chapters?.[0]?.episodes?.[0];
    if (!episode)
      throw createError.NotFound("No episodes was found with this Id");
    return copyObject(episode);
  }
}

module.exports = {
  episodeController: new episodeController(),
};
