const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");
const { productResolver } = require("./queries/product.resolver");
const {
  likeProduct,
  likeBlog,
  likeCourse,
} = require("./mutations/likes.resolver");
const {
  disLikeProduct,
  disLikeCourse,
  disLikeBlog,
} = require("./mutations/disLikes.resolver");
const {
  addProductToBasket,
  addCourseToBasket,
  removeProductFromBasket,
  removeCourseFromBasket,
} = require("./mutations/basket.resolver");
const {
  bookmarkProduct,
  bookmarkCourse,
  bookmarkBlog,
} = require("./mutations/bookmark.resolver");
const {
  categoryResolver,
  categoryChildResolver,
} = require("./queries/category.resolver");
const { courseResolver } = require("./queries/course.resolver");
const {
  getUserBookmarkedBlogs,
  getUserBookmarkedProducts,
  getUserBookmarkedCourses,
  getUserBasket
} = require("./queries/user-profile.resolver");

const {
  createCommentForBlog,
  createCommentForCourse,
  createCommentForProduct,
} = require("./mutations/comment.resolver");
// query , mutations, schema, types
const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    blogs: blogResolver,
    products: productResolver,
    courses: courseResolver,
    categories: categoryResolver,
    childOfCategory: categoryChildResolver,
    getUserBookmarkedBlogs,
    getUserBookmarkedProducts,
    getUserBookmarkedCourses,
    getUserBasket
  },
});
const rootMutations = new GraphQLObjectType({
  name: "mutation",
  fields: {
    createCommentForBlog,
    createCommentForProduct,
    createCommentForCourse,
    likeProduct,
    likeBlog,
    likeCourse,
    disLikeProduct,
    disLikeCourse,
    disLikeBlog,
    bookmarkProduct,
    bookmarkCourse,
    bookmarkBlog,
    addProductToBasket,
    addCourseToBasket,
    removeProductFromBasket,
    removeCourseFromBasket,
  },
});
const graphqlSchema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutations,
});

module.exports = {
  graphqlSchema,
};
