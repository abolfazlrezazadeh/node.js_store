const { GraphQLList, GraphQLString } = require("graphql");
const { blogType } = require("../typeDefs/blog.type");
const { blogModel } = require("../../model/blog");
// const {
//   vrefiyAccessTokenInGraphQL,
// } = require("../../http/middleware/verifyAccesssToken");

const blogResolver = {
  type: new GraphQLList(blogType),
  args : {
    category: {type : GraphQLString}
  },
  resolve: async (_, args, context, info) => {
    // const { req } = context;
    // req.user = await vrefiyAccessTokenInGraphQL(req);
    const {category} = args
    const findQuery = category? {category} : {}
    return await blogModel 
      .find(findQuery)
      .populate([{ path: "author" }, { path: "category" }]);
  },
};

module.exports = {
  blogResolver,
};
