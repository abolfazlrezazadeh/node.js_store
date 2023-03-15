const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createError = require("http-errors");
const { productModel } = require("../../../model/product");
const {
  deleteFileInPublic,
  quantificationOfFeauters,
  quantificationOfType,
  listOfImagesFromRequest,
  copyObject,
  deleteFolderRecursive,
} = require("../../../utils/function");
const { createProductSchema } = require("../../validator/admin/product.schema");
const { IdValidator } = require("../../validator/public.validator");
const controller = require("../controller");

class productController extends controller {
  async addProduct(req, res, next) {
    try {
      req.body.image = req.body.fileUploadPath;
      console.log(req.body.image);
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
      } = productBody;
      const supplier = req.user._id;
      const images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath,
        productBody
      );
      // req.body.image = copyObject(images);
      let feature = quantificationOfFeauters(req.body);
      let type = quantificationOfType(req.body);
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
      return res.status(httpStatus.CREATED).json({
        data: {
          statusCode: httpStatus.CREATED,
          message: "product create successfully",
        },
      });
    } catch (error) {
      deleteFolderRecursive(req.body.image);
      console.log(error);
      next(error);
    }
  }

  async getListOfProducts(req, res, next) {
    try {
      const search = req?.query?.search || "";
      let product;
      if (search) {
        product = await productModel.find({
          $text: {
            $search: new RegExp(search, "ig"),
          },
        });
      } else {
        product = await productModel.find({});
      }
      return res.status(httpStatus.OK).json({
        data: {
          statusCode: httpStatus.OK,
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const data = copyObject(req.body);
      data.images = listOfImagesFromRequest(req?.files || [],req.body.fileUploadPath, data);

    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProduct(id);
      if (product) {
        return res.status(httpStatus.OK).json({
          data: {
            statusCode: httpStatus.OK,
            product,
          },
        });
      } else {
        throw res.status(httpStatus.BAD_REQUEST).json({
          data: {
            statusCode: httpStatus.BAD_REQUEST,
            message: createError.NotFound("no product found"),
          },
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProduct(id);
      if (!product)
        return res.status(httpStatus.NOT_FOUND).json({
          data: {
            statusCode: httpStatus.NOT_FOUND,
            message: "entered id is not correct",
          },
        });
      const deleetdProduct = await productModel.deleteOne({ _id: product._id });
      if (deleetdProduct.deletedCount == 0)
        throw createError.InternalServerError(
          "desired product was not deleted"
        );
      return res.status(httpStatus.OK).json({
        data: {
          statusCode: httpStatus.OK,
          message: "product deleted successfully",
        },
      });
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
