const {courseController} = require("../../http/controller/admin/course.controller");
const { StringToArray } = require("../../http/middleware/stringatoArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
/**
 * @swagger
 *  /admin/course/list:
 *      get:
 *          tags: [course(adminPanel)]
 *          summary: get all of courses
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjgwODU4NzcwLCJleHAiOjE2ODA5NDUxNzB9.miRHrYuEdU2ZDzABj6O9tzk8lVEHR9ceF8YGDWZ5ZXI
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description : search in text bio description
 *          responses:
 *               200:
 *                  description: success
 *               400:
 *                  description: unsuccessfull
 */
router.get("/list",courseController.getListOfCourses);

/**
 * @swagger
 *  /admin/course/add:
 *      post:
 *          tags: [course(adminPanel)]
 *          summary: create new course
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjgwODU4NzcwLCJleHAiOjE2ODA5NDUxNzB9.miRHrYuEdU2ZDzABj6O9tzk8lVEHR9ceF8YGDWZ5ZXI
 *              -   in: formData
 *                  name: title
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: bio
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: description
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  required : true
 *                  type: array
 *                  items:
 *                      type: string
 *              -   in: formData
 *                  name: category
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: price
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: disCount
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required : true
 *                  type: file
 *                  format: binary
 *              -   in: formData
 *                  name: type
 *                  description: cash / free / premium
 *                  type: string
 *                  enum: 
 *                      -   free
 *                      -   cash
 *                      -   premium
 *          responses:
 *               201:
 *                  description: created
 *               400:
 *                  description: failed
 */
router.post(
    "/add",
    uploadFile.single("image"),
    StringToArray("tags"),
    courseController.addCourse
  );

module.exports = {
  courseAdminApiRouter: router,
};
