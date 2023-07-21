const { GraphQLObjectType, GraphQLList } = require("graphql");
const { categoriesType } = require("../typeDefs/category.type");
const { categoryModel } = require("../../model/category");

const categoryResolver = {
  type: new GraphQLList(categoriesType),
  resolve: async () => {
    // get  all categories
    const categories = await categoryModel.find({});
    return categories;
  },
};
module.exports = {
  categoryResolver,
};
