const { GraphQLObjectType, GraphQLSchema } = require("graphql");
// query , mutations, schema, types
const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {},
});
const rootMutations = new GraphQLObjectType({
  name: "mutations",
  fields: {},
});
const graphqlSchema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutations,
});

module.exports = {
    graphqlSchema
}
