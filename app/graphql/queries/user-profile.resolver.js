const { GraphQLList, GraphQLString } = require("graphql");
const { blogType } = require("../typeDefs/blog.type");
const { blogModel } = require("../../model/blog");
const {
  vrefiyAccessTokenInGraphQL,
} = require("../../http/middleware/verifyAccesssToken");
const { productType } = require("../typeDefs/product.type");
const { productModel } = require("../../model/product");
const { courseType } = require("../typeDefs/course.type");
const { courseModel } = require("../../model/course");
const { anyType } = require("../typeDefs/public.type");
const { userModel } = require("../../model/users");

const getUserBookmarkedBlogs = {
  type: new GraphQLList(blogType),
  resolve: async (_, args, context, info) => {
    try {
      // authenticate
      const { req } = context;
      const user = await vrefiyAccessTokenInGraphQL(req);
      const blogs = await blogModel
        .find({ bookmark: user._id })
        .populate([
          { path: "author" },
          { path: "category" },
          { path: "comments.user" },
          { path: "comments.answers.user" },
          { path: "likes" },
          { path: "disLikes" },
          { path: "bookmark" },
        ]);
      return blogs;
    } catch (error) {
      console.log(error);
    }
  },
};
const getUserBookmarkedProducts = {
  type: new GraphQLList(productType),
  resolve: async (_, args, context, info) => {
    try {
      // authenticate
      const { req } = context;
      const user = await vrefiyAccessTokenInGraphQL(req);
      const products = await productModel
        .find({ bookmark: user._id })
        .populate([
          { path: "supplier" },
          { path: "category" },
          { path: "comments.user" },
          { path: "comments.answers.user" },
          { path: "likes" },
          { path: "disLikes" },
          { path: "bookmark" },
        ]);
      return products;
    } catch (error) {
      console.log(error);
    }
  },
};

const getUserBookmarkedCourses = {
  type: new GraphQLList(courseType),
  resolve: async (_, args, context, info) => {
    try {
      // authenticate
      const { req } = context;
      const user = await vrefiyAccessTokenInGraphQL(req);
      const courses = await courseModel
        .find({ bookmark: user._id })
        .populate([
          { path: "teacher" },
          { path: "category" },
          { path: "comments.user" },
          { path: "comments.answers.user" },
          { path: "likes" },
          { path: "disLikes" },
          { path: "bookmark" },
        ]);
      return courses;
    } catch (error) {
      console.log(error);
    }
  },
};

const getUserBasket = {
  type: anyType,
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const userDetail = await userModel.aggregate([
      { $match: { _id: user._id } },
      { $project: { basket: 1 } },
      {
        $lookup: {
          from: "products",
          localField: "basket.products.productId",
          foreignField: "_id",
          as: "productDetail",
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "basket.courses.courseId",
          foreignField: "_id",
          as: "courseDetail",
        },
      },
      {
        $addFields: {
          productDetail: {
            $function: {
              body: function (productDetail, products) {
                return productDetail.map(function (product) {
                  const count = products.find((item) =>item.productId.valueOf() == product._id.valueOf()).count;
                  const totalPrice = count * product.price;
                  return {
                    ...product,
                    basketCount: count,
                    totalPrice: totalPrice,
                    discount : `${product.disCount}%`,
                    finalPrice : totalPrice - ((product.disCount / 100) * totalPrice),
                  };
                });
              },
              //parameters of upper function
              args: ["$productDetail", "$basket.products"],
              //language of coding
              lang: "js",
            },
          },
        },
      },
      {
        $project : {
          basket : 0
        }
      }
    ]);
    return userDetail
  },
};
module.exports = {
  getUserBookmarkedBlogs,
  getUserBookmarkedCourses,
  getUserBookmarkedProducts,
  getUserBasket,
};
