const { categoryModel } = require("../../../model/cetegory");
const createErrors = require("http-errors");
const controller = require("../controller");
const { addCategorySchema } = require("../../validator/admin/category.schema");

class categoryController extends controller {

  async addCategory(req, res, next) {
      try {
        console.log("1");
        await addCategorySchema.validateAsync(req.body);
    const { title, parent } = req.body;
    const category = await categoryModel.create({ title, parent });
    if (!category) {
      throw createErrors.InternalServerError(
        "creating category is not successfully"
      );
    }
    return res.status(201).send({
      data: {
        statusCode: 201,
        message: "the category was created successfully",
      },
    });
    } catch (error) {
      console.log(error);
        next(error);
    }

    
  }
  removeCategory(req, res, next) {}
  editCategory(req, res, next) {}
  getAllCategory(req, res, next) {}
  getCategoryByID(req, res, next) {}
  getAllParents(req, res, next) {}
  getChildOfParents(req, res, next) {}
}

module.exports = {
  categoryController: new categoryController(),
};
