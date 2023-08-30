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
            _id: user._id, "basket.products.productId" : productId 
        },
        { 
            $inc: {
             "basket.products.$.count": 1 
            } 
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
      data : {
        message : "product has been added to the basket"
      }
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
  const basketProduct = await userModel.findOne(
    { _id: userId, "basket.products.productId": productId },
    { "basket.products.$": 1 }
  );
  const product = await copyObject(basketProduct);
  return product?.basket?.[0]?.products?.[0];
}
module.exports = {
  addProductToBasket,
  addCourseToBasket,
  removeProductFromBasket,
  removeCourseFromBasket,
};
