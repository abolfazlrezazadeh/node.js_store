const {chapterController} = require("../../http/controller/admin/course/chapter.controller");
const router = require("express").Router();

router.get("/list/:courseId", chapterController.listOfChapters)

router.put("/add-chapter", chapterController.addChapter);

module.exports = {
    chapterAdminApiRoute : router
}