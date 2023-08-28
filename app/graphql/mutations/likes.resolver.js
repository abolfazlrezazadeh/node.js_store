const { GraphQLString } = require("graphql");
const { responseType } = require("../typeDefs/public.type");
const { productModel } = require("../../model/product");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { vrefiyAccessTokenInGraphQL } = require("../../http/middleware/verifyAccesssToken");

const likeProduct = {
  type: responseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { productId } = args;
    let likedProduct = await productModel.findOne({_id : productId, likes :  user._id})
    let disLikedProduct = await productModel.findOne({_id : productId, disLikes : user._id})
    const updateQuery = likedProduct ? {$pull : {likes : user._id}} : {$push : {likes : user._id}};
    await productModel.updateOne({_id : productId},updateQuery);     
    if(disLikedProduct && !likedProduct){
      await productModel.updateOne({_id : productId},{$pull : {disLikes : user._id}})
    }
    return {
      statusCode : httpStatus.CREATED,
      data : {
        message : "liking product is successfully done"
      }
    }
  },
};

const likeCourse = {
  type: responseType,
  args: {
    courseId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { courseId } = args;
  },
};

const likeBlog = {
  type: responseType,
  args: {
    blogId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { blogId } = args;
  },
};


module.exports = {
  likeProduct
}