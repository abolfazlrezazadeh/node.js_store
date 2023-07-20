const { GraphQLList } = require("graphql");
const { blogType } = require("../typeDefs/blog.type");
const { blogModel } = require("../../model/blog");

const blogResolver = {
  type: new GraphQLList(blogType),
  resolve: async () => {
    return await blogModel.find({}).populate([{path : "author"},{path : "category"}]);
  },
};

module.exports = {
  blogResolver,
};
