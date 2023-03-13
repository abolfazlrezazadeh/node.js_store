const path = require("path");
const createError = require("http-errors");
const { productModel } = require("../../../model/product");
const {
  deleteFileInPublic,
  quantificationOfFeauters,
  quantificationOfType,
  listOfImagesFromRequest,
} = require("../../../utils/function");
const { createProductSchema } = require("../../validator/admin/product.schema");
const { IdValidator } = require("../../validator/public.validator");
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
      const supplier = req.user._id;
      const images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath,
        productBody
      );
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
        data: {
          statusCode: 200,
          product,
        },
      });
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
      const { id } = req.params;
      const product = await this.findProduct(id);
      if(product){
        return res.status(200).json({
          data: {
            statusCode: 200,
            product,
          },
        });
      }else{
        throw res.status(400).json({
          data:{
            statusCode : 400,
            message : createError.NotFound("no product found")
          }
        })
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async findProduct(productId) {
    try {
      const { id } = await IdValidator.validateAsync({ id: productId });
      const product = await productModel.findById(id);
      if (!product) {
        throw createError.NotFound("No product found");
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = {
  productController: new productController(),
};
