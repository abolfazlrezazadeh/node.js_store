const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createError = require("http-errors");
const { productModel } = require("../../../../model/product");
const {
  deleteFileInPublic,
  quantificationOfFeauters,
  quantificationOfType,
  listOfImagesFromRequest,
  copyObject,
  deleteSeveralFilseInPublic,
  deleteInvalidPropertyInObject,
} = require("../../../../utils/function");
const { createProductSchema } = require("../../../validator/admin/product.schema");
const { IdValidator } = require("../../../validator/public.validator");
const controller = require("../../controller");
const productBlackList = {
  BOOKMARK: "bookmark",
  DISLIKE: "disLike",
  LIKE: "like",
  COMMENT: "comment",
  SUPPLIER: "supplier",
  FEATURE: "feature",
};
Object.freeze(productBlackList);

class productController extends controller {
  async addProduct(req, res, next) {
    try {
      const images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath,
        req.body
      );
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
        statusCode: httpStatus.CREATED,
        data: {
          message: "product create successfully",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      // deleteSeveralFilseInPublic(req.body.image, function(err) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log('all files removed');
      //   }
      // });
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
        statusCode: httpStatus.OK,
        data: {
          product,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      //find product
      const product = await this.findProduct(id);
      if (!product)
        return res.status(httpStatus.NOT_FOUND).json({
          statusCode: httpStatus.NOT_FOUND,
          data: {
            message: "entered id is not correct or there is no product",
          },
        });
      const data = copyObject(req.body);
      data.images = listOfImagesFromRequest(
        req?.files || [],
        req.body.fileUploadPath,
        data
      );
      data.feature = quantificationOfFeauters(req.body);
      //type of blackList is array
      let blackList = Object.values(productBlackList);
      deleteInvalidPropertyInObject(data, blackList);
      const updateProductResult = await productModel.updateOne(
        { _id: product._id },
        { $set: data }
      );
      if (updateProductResult.modifiedCount == 0)
        throw {
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: "Internal server error",
        };
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "The desired product has been updated",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      console.log(error);
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProduct(id);
      if (product) {
        return res.status(httpStatus.OK).json({
          statusCode: httpStatus.OK,
          data: {
            product,
          },
        });
      } else {
        throw res.status(httpStatus.BAD_REQUEST).json({
          statusCode: httpStatus.BAD_REQUEST,
          data: {
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
          statusCode: httpStatus.NOT_FOUND,
          data: {
            message: "entered id is not correct",
          },
        });
      const deleetdProduct = await productModel.deleteOne({ _id: product._id });
      if (deleetdProduct.deletedCount == 0)
        throw createError.InternalServerError(
          "desired product was not deleted"
        );
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
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
