const { courseModel } = require("../../../model/course");
const controller = require("../controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const path = require("path");

class courseController extends controller {
  async getListOfCourses(req, res, next) {
    try {
        const {search} = req?.query?.search || "";
      let  courses;
      if (search) {
        courses = await courseModel.find({
          $text: {
            $search: search
          },
        }).sort({ _id: -1 });;
      } else {
        courses = await courseModel.find({})
      }
       // sort from last to first
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        courses,
      });
    } catch (error) {
      next(error);
    }
  }
  async addCourse(req,res,next){
    try {
        const {fileUploadPath, fileName} = req.body;
        const image = path.join(fileUploadPath, fileName).replace(/\\/g, "/");
        
        const {title, bio, description, tags, category, price, disCount,  type} = req.body;
        return res.status(httpStatus.CREATED).json({title, bio, description, tags, category, price, disCount,  type, image});
    } catch (error) {
        next(error)
    }
  }
}

module.exports = {
  courseController: new courseController(),
};
