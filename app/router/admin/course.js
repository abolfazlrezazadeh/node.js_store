const {courseController} = require("../../http/controller/admin/course.controller");

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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjgwNzcyODYzLCJleHAiOjE2ODA4NTkyNjN9.MLBRW1JyPwkAaMYncF-sAoeT7CuNBY7NYiiLRcyvHpU
 *          responses:
 *               200:
 *                  description: success
 *               400:
 *                  description: unsuccessfull
 */
router.get("/list",courseController.getListOfCourses);

module.exports = {
  courseAdminApiRouter: router,
};
