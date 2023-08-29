const { GraphQLList, GraphQLString } = require("graphql");
const { productModel } = require("../../model/product");
const { productType } = require("../typeDefs/product.type");

const productResolver = {
  type: new GraphQLList(productType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args, context, info) => {
    const { category } = args;
    const findQuery = category ? { category } : {};
    return await productModel
      .find(findQuery)
      .populate([
        { path: "supplier" },
        { path: "category" },
        { path: "comments.user" },
        { path: "comments.answers.user" },
        { path: "likes" },
        { path: "disLikes" },
        { path: "bookmark" },
      ]);
  },
};

module.exports = {
  productResolver,
};
