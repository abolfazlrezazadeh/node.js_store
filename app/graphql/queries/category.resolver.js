const { GraphQLObjectType, GraphQLList, GraphQLString } = require("graphql");
const { categoriesType } = require("../typeDefs/category.type");
const { categoryModel } = require("../../model/category");

const categoryResolver = {
  type: new GraphQLList(categoriesType),

  resolve: async () => {
    console.log(args);
    // get  all categories
    const categories = await categoryModel.find({});
    return categories;
  },
};
const categoryChildResolver = {
  type: new GraphQLList(categoriesType),
  args: {
    parent: { type: GraphQLString },
  },
  resolve: async (obj, args, context, info) => {
    const {parent} = args;
    // get  all categories
    const categories = await categoryModel.find({parent});
    return categories;
  },
};
module.exports = {
  categoryResolver,
  categoryChildResolver
};
