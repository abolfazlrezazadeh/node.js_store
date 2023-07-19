const {
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");
const { blogResolver } = require("./queries/blog.resolver");
// query , mutations, schema, types
const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    blogs: blogResolver
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
