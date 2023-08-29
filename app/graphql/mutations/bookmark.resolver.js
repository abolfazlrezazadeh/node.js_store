const { GraphQLString } = require("graphql");
const { responseType } = require("../typeDefs/public.type");
const { productModel } = require("../../model/product");
const { StatusCodes: httpStatus } = require("http-status-codes");
const {
  vrefiyAccessTokenInGraphQL,
} = require("../../http/middleware/verifyAccesssToken");
const { courseModel } = require("../../model/course");
const { blogModel } = require("../../model/blog");
const {
  checkExistProduct,
  checkExistCourse,
  checkExistBlog,
} = require("../utills");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");

const bookmarkProduct = {
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
    let bookmarkedProduct = await productModel.findOne({
      _id: productId,
      bookmark: user._id,
    });
    let message = "product has been added to the bookmarks";
    let updateQuery;
    if (bookmarkedProduct) {
      updateQuery = { $pull: { bookmark: user._id } };
      message = "The product was removed from bookmarks";
    }
    if (!bookmarkedProduct) {
      updateQuery = { $push: { bookmark: user._id } };
    }
    await productModel.updateOne({ _id: productId }, updateQuery);
    return {
      statusCode: httpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const bookmarkCourse = {
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
    let bookmarkedCourse = await courseModel.findOne({
      _id: courseId,
      bookmark: user._id,
    });
    let message = "course has been added to the bookmarks";
    let updateQuery;
    if (bookmarkedCourse) {
      updateQuery = { $pull: { bookmark: user._id } };
      message = "The course was removed from bookmarks";
    }
    if (!bookmarkedCourse) {
      updateQuery = { $push: { bookmark: user._id } };
    }
    await courseModel.updateOne({ _id: courseId }, updateQuery);
    return {
      statusCode: httpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const bookmarkBlog = {
  type: responseType,
  args: {
    blogId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { blogId } = args;
    //check BlogID
    if (!mongoose.isValidObjectId(blogId))
      throw createHttpError.BadRequest("blog Id is not correct");
    await checkExistBlog(blogId);
    let bookmarkedBlog = await blogModel.findOne({
      _id: blogId,
      bookmark: user._id,
    });
    let message = "blog has been added to the bookmarks";
    let updateQuery;
    if (bookmarkedBlog) {
      updateQuery = { $pull: { bookmark: user._id } };
      message = "The course was removed from bookmarks";
    }
    if (!bookmarkedBlog) {
      updateQuery = { $push: { bookmark: user._id } };
    }
    await blogModel.updateOne({ _id: blogId }, updateQuery);
    return {
      statusCode: httpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

module.exports = {
  bookmarkProduct,
  bookmarkCourse,
  bookmarkBlog,
};
