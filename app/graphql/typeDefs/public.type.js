const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");

const authorType = new GraphQLObjectType({
  name: "authorType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  },
});
const publicCategoryType = new GraphQLObjectType({
  name: "publicCategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

module.exports = {
  authorType,
  publicCategoryType,
};
