const { GraphQLString } = require("graphql");
const { commentType } = require("../typeDefs/comment.type");
const { blogModel } = require("../../model/blog");
const {StatusCodes: httpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const {
  vrefiyAccessTokenInGraphQL,
} = require("../../http/middleware/verifyAccesssToken");
const { responseType } = require("../typeDefs/public.type");


const createCommentForBlog = {
  type: responseType,
  args: {
    comment: { type: GraphQLString },
    blogId: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authentacate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { comment, blogId, parent } = args;
    await checkExistBlog(blogId);
    //push data
    blogModel.updateOne(
      { _id: blogId },
      {
        $push: {
          comments: {
            comment,
            user: user._id,
            show: false,
            // if !parent => true
            openToComment: !parent,
          },
        },
      }
    );
    return {
        statusCode : httpStatus.CREATED,
        data : {
            message : "›omment was successfully registered and will be placed on the website after confirmation"
        }
    }
  },
};
async function checkExistBlog(id) {
  const blog = await blogModel.findOne(id);
  if (!blog) throw createHttpError.NotFound("Blog not found");
  return blog;
}

module.exports = {
  createCommentForBlog,
};
