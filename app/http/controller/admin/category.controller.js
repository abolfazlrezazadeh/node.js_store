const { categoryModel } = require("../../../model/cetegory");
const createErrors = require("http-errors");
const controller = require("../controller");
const mongoose = require("mongoose");
const { addCategorySchema } = require("../../validator/admin/category.schema");

class categoryController extends controller {
  async addCategory(req, res, next) {
    try {
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
  async getAllCategory(req, res, next) {
    try {
      // const category = await categoryModel.aggregate([
      //   {
      //     $lookup: {
      //       from: "categories",
      //       localField: "_id",
      //       foreignField: "parent",
      //       //parent is same with id
      //       as: "children",
      //     },
      //   },
      const category = await categoryModel.aggregate([
        {
          $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "parent",
            as: "children",
            maxDepth: 5,
            depthField: "depth",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
        {
          $match: {
            parent: undefined,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          statusCode: 200,
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const deleteCategory = await categoryModel.deleteMany({
        $or: [{ id: category._id }, { parent: category._id }],
      });
      //delete category with parent
      if (deleteCategory.deletedCount == 0)
        throw createErrors.InternalServerError("This product was not removed");
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "the catagory was deleted successfully",
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const parents = await categoryModel.find({ parent: undefined });
      return res.status(200).json({
        data: {
          statusCode: 200,
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildOfParents(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await categoryModel.find(
        { parent },
        { __v: 0, parent: 0 }
      );
      return res.status(200).json({
        data: {
          statusCode: 200,
          children,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistCategory(id) {
    const category = await categoryModel.findById(id);
    console.log(category);
    if (!category) throw createErrors.NotFound("the category does not exist");
    return category;
  }
  editCategory(req, res, next) {}
  async getCategoryByID(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryModel.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            //parent is same with id
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          statusCode: 200,
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  categoryController: new categoryController(),
};
