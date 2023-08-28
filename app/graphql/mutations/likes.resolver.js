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

const likeProduct = {
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
    let likedProduct = await productModel.findOne({
      _id: productId,
      likes: user._id,
    });
    let disLikedProduct = await productModel.findOne({
      _id: productId,
      disLikes: user._id,
    });
    // const updateQuery = likedProduct
    // ? { $pull: { likes: user._id } }
    // : { $push: { likes: user._id } };
    let message = "liking product is successfully done";
    let updateQuery;
    if (likedProduct) {
      updateQuery = { $pull: { likes: user._id } };
      message = "The product was unliked";
    }
    if (!likedProduct) {
      updateQuery = { $push: { likes: user._id } };
    }
    await productModel.updateOne({ _id: productId }, updateQuery);
    if (disLikedProduct && !likedProduct) {
      await productModel.updateOne(
        { _id: productId },
        { $pull: { disLikes: user._id } }
      );
      message = "The product was unliked";
    }
    return {
      statusCode: httpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const likeCourse = {
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
    let likedCourse = await courseModel.findOne({
      _id: courseId,
      likes: user._id,
    });
    let disLikedCourse = await courseModel.findOne({
      _id: courseId,
      disLikes: user._id,
    });
    // const updateQuery = likedCourse
    //   ? { $pull: { likes: user._id } }
    //   : { $push: { likes: user._id } };
    let message = "liking course is successfully done";
    let updateQuery;
    if (likedCourse) {
      updateQuery = { $pull: { likes: user._id } };
      message = "The course was unliked";
    }
    if (!likedCourse) {
      updateQuery = { $push: { likes: user._id } };
    }
    await courseModel.updateOne({ _id: courseId }, updateQuery);
    if (disLikedCourse && !likedCourse) {
      await courseModel.updateOne(
        { _id: courseId },
        { $pull: { disLikes: user._id } }
      );
    }
    return {
      statusCode: httpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

const likeBlog = {
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
    let likedBlog = await blogModel.findOne({ _id: blogId, likes: user._id });
    let disLikedBlog = await blogModel.findOne({
      _id: blogId,
      disLikes: user._id,
    });
    // const updateQuery = likedBlog
    //   ? { $pull: { likes: user._id } }
    //   : { $push: { likes: user._id } };
    let message = "liking blog is successfully done";
    let updateQuery;
    if (likedBlog) {
      updateQuery = { $pull: { likes: user._id } };
      message = "The blog was unliked";
    }
    if (!likedBlog) {
      updateQuery = { $push: { likes: user._id } };
    }
    await blogModel.updateOne({ _id: blogId }, updateQuery);
    if (disLikedBlog && !likedBlog) {
      await blogModel.updateOne(
        { _id: blogId },
        { $pull: { disLikes: user._id } }
      );
    }
    return {
      statusCode: httpStatus.CREATED,
      data: {
        message,
      },
    };
  },
};

module.exports = {
  likeProduct,
  likeCourse,
  likeBlog,
};
