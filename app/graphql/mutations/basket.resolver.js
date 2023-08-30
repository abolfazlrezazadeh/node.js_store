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

const addProductToBasket = {
  type: responseType,
  args: {
    productId: { type: GraphQLString },
    count: { type: GraphQLInt },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { productId, count } = args;
    //check productId
    if (!mongoose.isValidObjectId(productId))
      throw createHttpError.BadRequest("productId is not correct");
    await checkExistProduct(productId);
  },
};

const addCourseToBasket = {
  type: responseType,
  args: {
    courseId: { type: GraphQLString },
    count: { type: GraphQLInt },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { courseId, count } = args;
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
    count: { type: GraphQLInt },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { productId, count } = args;
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
    count: { type: GraphQLInt },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { courseId, count } = args;
    //check courseId
    if (!mongoose.isValidObjectId(courseId))
      throw createHttpError.BadRequest("courseId is not correct");
    await checkExistCourse(courseId);
  },
};

module.exports = {
  addProductToBasket,
  addCourseToBasket,
  removeProductFromBasket,
  removeCourseFromBasket,
};
