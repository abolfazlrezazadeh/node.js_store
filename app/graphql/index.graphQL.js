const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");
const { productResolver } = require("./queries/product.resolver");
const { likeAndDislikeProduct } = require("./mutations/likesAndDislikes.resolver");
const {
  categoryResolver,
  categoryChildResolver,
} = require("./queries/category.resolver");
const { courseResolver } = require("./queries/course.resolver");
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
  },
});
const rootMutations = new GraphQLObjectType({
  name: "mutation",
  fields: {
    createCommentForBlog,
    createCommentForProduct,
    createCommentForCourse,
    likeAndDislikeProduct
  },
});
const graphqlSchema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutations,
});

module.exports = {
  graphqlSchema,
};
