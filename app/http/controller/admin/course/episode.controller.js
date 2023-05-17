const {
  createEpisodeSchema,
} = require("../../../validator/admin/course.schema");
const controller = require("../../controller");

class episodeController extends controller {
  async addNewEpisode(req, res, next) {
    try {
      const { title, text, time, chapterId, courseId } =
        await createEpisodeSchema.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  episodeController: new episodeController(),
};
