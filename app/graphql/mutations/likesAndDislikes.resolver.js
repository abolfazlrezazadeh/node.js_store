const { GraphQLString } = require("graphql");
const { responseType } = require("../typeDefs/public.type");
const { productModel } = require("../../model/product");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { vrefiyAccessTokenInGraphQL } = require("../../http/middleware/verifyAccesssToken");

const likeAndDislikeProduct = {
  type: responseType,
  args: {
    productId: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { productId } = args;
    let message = "";
    let likedProduct = await productModel.findOne({_id : productId, likes : {}})
    let disLikedProduct = await productModel.findOne({_id : productId, likes : user._id})

    if(likedProduct){
      await productModel.updateOne({_id : productId},{$pull : {likes : user._id}})
      if(!disLikedProduct) await productModel.updateOne({_id : productId},{$push : {disLikes : user._id}})
      message = "liking product is successfully done"
    }
    if(disLikedProduct){
      await productModel.updateOne({_id : productId},{$pull : {disLikes : user._id}})
      if(!disLikedProduct) await productModel.updateOne({_id : productId},{$push : {likes : user._id}})
      message = "disliking product is successfully done"
    }
    return {
      statusCode : httpStatus.CREATED,
      data : {
        message
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
  likeAndDislikeProduct
}