const {
  chapterController,
} = require("../../http/controller/admin/course/chapter.controller");
const router = require("express").Router();

router.put("/add-chapter", chapterController.addChapter);

router.get("/list/:courseId", chapterController.listOfChapters);

router.patch("/remove/:chapterId", chapterController.removeChapterById);

router.patch("/update/:chapterId", chapterController.updateChapterById);


module.exports = {
  chapterAdminApiRoute: router,
};
