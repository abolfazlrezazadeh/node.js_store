const { GraphQLList } = require("graphql");
const { productModel } = require("../../model/product");
const { productType } = require("../typeDefs/product.type");

const productResolver = {
  type: new GraphQLList(productType),
  resolve: async () => {
    return await productModel.find({}).populate([{path : "supplier"},{path : "category"}]);
  },
};

module.exports = {
  productResolver,
};
