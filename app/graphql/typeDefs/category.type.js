const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { publicCategoryType, anyType } = require("./public.type");

const categoriesType = new GraphQLObjectType({
  name: "categoriesType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    children : {type : new GraphQLList(anyType)}
  },
});

module.exports = {
  categoriesType,
};
