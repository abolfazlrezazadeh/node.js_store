const { GraphQLString, GraphQLInt } = require("graphql");
const { responseType } = require("../typeDefs/public.type");
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
    const userCourse = await userModel.findOne({
      _id: user._id,
      courses: courseId,
    });
    if (userCourse)
      throw createHttpError.BadRequest(
        "this course is already in your course list"
      );
    const course = await findCourseInBasket(user._id, courseId);
    //add count
    if (course) {
      throw createHttpError.BadRequest(
        "this course is already added to your basket"
      );
    } else {
      // add to basket
      await userModel.updateOne(
        { _id: user._id },
        {
          $push: {
            "basket.courses": { courseId, count: 1 },
            courses: courseId,
          },
        }
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
      message = "The number of products in your basket was reduced.";
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
        message,
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
    const course = await findCourseInBasket(user._id, courseId);
    let message;
    // delete course from course list
    await userModel.updateOne({_id:user._id},{$pull : {courses : courseId}})
    if (!course)
      throw createHttpError.NotFound("can not find course in your basket");
    //add count
    if (course.count > 1) {
      await userModel.updateOne(
        {
          _id: user._id,
          "basket.courses.courseId": courseId,
        },
        {
          $inc: {
            "basket.courses.$.count": -1,
          },
        }
      );
      message = "The number of courses in your basket was reduced.";
    } else {
      // add to basket
      await userModel.updateOne(
        { _id: user._id, "basket.courses.courseId": courseId },
        { $pull: { "basket.courses": { courseId } } }
      );
      message = "The course has been removed from your basket";
    }
    return {
      statusCode: httpStatus.OK,
      data: {
        message,
      },
    };
  },
};

async function findProductInBasket(userId, productId) {
  const findResult = await userModel.findOne(
    { _id: userId, "basket.products.productId": productId },
    { "basket.products.$": 1 }
  );
  const userDetail = await copyObject(findResult);
  return userDetail?.basket?.products?.[0] || null;
}

async function findCourseInBasket(userId, courseId) {
  const findResult = await userModel.findOne(
    { _id: userId, "basket.courses.courseId": courseId },
    { "basket.courses.$": 1 }
  );
  const userDetail = await copyObject(findResult);
  return userDetail?.basket?.courses?.[0] || null;
}

module.exports = {
  addProductToBasket,
  addCourseToBasket,
  removeProductFromBasket,
  removeCourseFromBasket,
};
