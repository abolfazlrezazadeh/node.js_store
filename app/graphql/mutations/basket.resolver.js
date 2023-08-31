const { GraphQLString, GraphQLInt } = require("graphql");
const { responseType } = require("../typeDefs/public.type");
const { productModel } = require("../../model/product");
const { StatusCodes: httpStatus } = require("http-status-codes");
const {
  vrefiyAccessTokenInGraphQL,
} = require("../../http/middleware/verifyAccesssToken");
const { courseModel } = require("../../model/course");
const { checkExistProduct, checkExistCourse } = require("../utills");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const { userModel } = require("../../model/users");
const { copyObject } = require("../../utils/function");

const addProductToBasket = {
  type: responseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { productId } = args;
    //check productId
    if (!mongoose.isValidObjectId(productId))
      throw createHttpError.BadRequest("productId is not correct");
    await checkExistProduct(productId);
    const product = await findProductInBasket(user._id, productId);
    //add count
    if (product) {
      await userModel.updateOne(
        {
          _id: user._id,
          "basket.products.productId": productId,
        },
        {
          $inc: {
            "basket.products.$.count": 1,
          },
        }
      );
    } else {
      // add to basket
      await userModel.updateOne(
        { _id: user._id },
        { $push: { "basket.products": { productId, count: 1 } } }
      );
    }
    return {
      statusCode: httpStatus.OK,
      data: {
        message: "product has been added to the basket",
      },
    };
  },
};

const addCourseToBasket = {
  type: responseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { courseId } = args;
    //check courseId
    if (!mongoose.isValidObjectId(courseId))
      throw createHttpError.BadRequest("courseId is not correct");
    await checkExistCourse(courseId);
    const course = await findCourseInBasket(user._id, courseId);
    //add count
    if (course) {
      await userModel.updateOne(
        {
          _id: user._id,
          "basket.courses.courseId": courseId,
        },
        {
          $inc: {
            "basket.courses.$.count": 1,
          },
        }
      );
    } else {
      // add to basket
      await userModel.updateOne(
        { _id: user._id },
        { $push: { "basket.courses": { courseId, count: 1 } } }
      );
    }
    return {
      statusCode: httpStatus.OK,
      data: {
        message: "course has been added to the basket",
      },
    };
  },
};

const removeProductFromBasket = {
  type: responseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { productId } = args;
    //check productId
    if (!mongoose.isValidObjectId(productId))
      throw createHttpError.BadRequest("productId is not correct");
    await checkExistProduct(productId);
    const product = await findProductInBasket(user._id, productId);
    let message;
    if (!product)
      throw createHttpError.NotFound("can not find product in your basket");
    //add count
    if (product.count > 1) {
      await userModel.updateOne(
        {
          _id: user._id,
          "basket.products.productId": productId,
        },
        {
          $inc: {
            "basket.products.$.count": -1,
          },
        }
      );
      message = "The number of products in your shopping cart was reduced.";
    } else {
      // add to basket
      await userModel.updateOne(
        { _id: user._id, "basket.products.productId": productId },
        { $pull: { "basket.products": { productId } } }
      );
      message = "The product has been removed from your basket";
    }
    return {
      statusCode: httpStatus.OK,
      data: {
        message
      },
    };
  },
};

const removeCourseFromBasket = {
  type: responseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { courseId } = args;
    //check courseId
    if (!mongoose.isValidObjectId(courseId))
      throw createHttpError.BadRequest("courseId is not correct");
    await checkExistCourse(courseId);
  },
};

async function findProductInBasket(userId, productId) {
  const findResult = await userModel.findOne(
    { _id: userId, "basket.products.productId": productId },
    { "basket.products.$": 1 }
  );
  const userDetail = await copyObject(findResult);
  return userDetail?.basket?.[0]?.products?.[0];
}

async function findCourseInBasket(userId, courseId) {
  const findResult = await userModel.findOne(
    { _id: userId, "basket.courses.courseId": courseId },
    { "basket.courses.$": 1 }
  );
  const userDetail = await copyObject(findResult);
  return userDetail?.basket?.[0]?.courses?.[0];
}

module.exports = {
  addProductToBasket,
  addCourseToBasket,
  removeProductFromBasket,
  removeCourseFromBasket,
};
