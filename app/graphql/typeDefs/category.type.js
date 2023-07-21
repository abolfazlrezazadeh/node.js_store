const { GraphQLObjectType, GraphQLString } = require("graphql");

const categoriesType = new GraphQLObjectType({
  name: "categoriesType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
  },
});

module.exports = {
  categoriesType,
};
