const { GraphQLList } = require("graphql");
const { blogType } = require("../typeDefs/blog.type");
const { blogModel } = require("../../model/blog");
const {
  vrefiyAccessTokenInGraphQL,
} = require("../../http/middleware/verifyAccesssToken");

const blogResolver = {
  type: new GraphQLList(blogType),
  resolve: async (_, args, context, info) => {
    // const { req } = context;
    // req.user = await vrefiyAccessTokenInGraphQL(req);
    return await blogModel
      .find({})
      .populate([{ path: "author" }, { path: "category" }]);
  },
};

module.exports = {
  blogResolver,
};
