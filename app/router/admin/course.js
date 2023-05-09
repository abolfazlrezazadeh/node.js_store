const {courseController} = require("../../http/controller/admin/course.controller");
const { StringToArray } = require("../../http/middleware/stringatoArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();


router.get("/list",courseController.getListOfCourses);


router.post(
    "/add",
    uploadFile.single("image"),
    StringToArray("tags"),
    courseController.addCourse
  );

  
  
  router.get("/:id",courseController.getCourseById); 
  router.put("/add-chapter", courseController.addChapter);

module.exports = {
  courseAdminApiRouter: router,
};
