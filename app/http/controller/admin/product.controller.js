const path  = require("path");
const { productModel } = require("../../../model/product");
const {
  deleteFileInPublic,
  quantificationOfFeauters,
  quantificationOfType
} = require("../../../utils/function");
const { createProductSchema } = require("../../validator/admin/product.schema");
const controller = require("../controller");

class productController extends controller {
  async addProduct(req, res, next) {
    try {
      const productBody = await createProductSchema.validateAsync(req.body);
      const {
        title,
        bio,
        description,
        tags,
        category,
        price,
        count,
        disCount,
        height,
        width,
        length,
        weight,
      } = productBody;
      req.body.image = path.join(
        productBody.fileUploadPath,
        productBody.fileName
      );
      const supplier = req.user._id;
      const images  = req.body.image.replace(/\\/g, "/");
      let feature = quantificationOfFeauters(height, width, length, weight);
      let type = quantificationOfType(height, width, length, weight);
      await productModel.create({
        title,
        bio,
        description,
        tags,
        category,
        price,
        count,
        disCount,
        images,
        supplier,
        feature,
        type,
      });
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "product create successfully",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      console.log(error);
      next(error);
    }
  }
  async getListOfProducts(req, res, next) {
    try {
      const product = await productModel.find({});
      return res.status(200).json({
        data:{
          statusCode : 200,
          product
        }
      })
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  productController: new productController(),
};
