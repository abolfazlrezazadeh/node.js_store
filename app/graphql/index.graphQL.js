const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");
const { productResolver } = require("./queries/product.resolver");
const { categoryResolver, categoryChildResolver } = require("./queries/category.resolver");
const { courseResolver } = require("./queries/course.resolver");
// query , mutations, schema, types
const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    blogs: blogResolver,
    products: productResolver,
    courses: courseResolver,
    categories: categoryResolver,
    childOfCategory : categoryChildResolver,
  },
});
const rootMutations = new GraphQLObjectType({
  name: "mutations",
  fields: {},
});
const graphqlSchema = new GraphQLSchema({
  query: rootQuery,
  //   mutation: rootMutations,
});

module.exports = {
  graphqlSchema,
};
