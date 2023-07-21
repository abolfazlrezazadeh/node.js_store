const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { publicCategoryType } = require("./public.type");

const categoriesType = new GraphQLObjectType({
  name: "categoriesType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    children : {type : new GraphQLList(publicCategoryType)}
  },
});

module.exports = {
  categoriesType,
};
