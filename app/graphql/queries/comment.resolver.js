const { GraphQLString } = require("graphql");
const { commentType } = require("../typeDefs/comment.type");
const { blogModel } = require("../../model/blog");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const {
  vrefiyAccessTokenInGraphQL,
} = require("../../http/middleware/verifyAccesssToken");
const { responseType } = require("../typeDefs/public.type");
const { copyObject } = require("../../utils/function");
const { default: mongoose } = require("mongoose");

const createCommentForBlog = {
  type: responseType,
  args: {
    comment: { type: GraphQLString },
    blogId: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    // authenticate
    const { req } = context;
    const user = await vrefiyAccessTokenInGraphQL(req);
    const { comment, blogId, parent } = args;
    //check BlogID
    if (!mongoose.isValidObjectId(blogId))
      throw createHttpError.BadRequest("blog Id is not correct");
    await checkExistBlog(blogId);
    // check exist parent of comment
    if (parent) {
      const commentDocument = await getComment(blogModel, parent);
      //check openToComment
      if (commentDocument && !commentDocument?.openToComment)
        throw createHttpError.BadRequest("you cannot allowed to reply comment");
      const createAnswerResult = await blogModel.updateOne(
        { "comments._id": parent },
        {
          $push: {
            "comments.$.answers": {
              comment,
              user: user._id,
              show: false,
              openToComment: false,
            },
          },
        }
      );
      if (!createAnswerResult.modifiedCount) {
        throw createHttpError.InternalServerError(
          "The answer was not registered"
        );
      }
      return {
        statusCode: httpStatus.CREATED,
        data: {
          message: "your answer is registred successfully",
        },
      };
    } else {
      //if !parent = create new comment
      await blogModel.updateOne(
        { _id: blogId },
        {
          $push: {
            comments: {
              comment,
              user: user._id,
              show: false,
              // if !parent = true
              openToComment: true,
            },
          },
        }
      );
    }
    return {
      statusCode: httpStatus.CREATED,
      data: {
        message:
          "Comment was successfully registered and will be placed on the website after confirmation",
      },
    };
  },
};
async function checkExistBlog(id) {
  const blog = await blogModel.findOne({ _id: id });
  if (!blog) throw createHttpError.NotFound("Blog not found");
  return blog;
}
async function getComment(model, id) {
  const findedComment = await model.findOne(
    { "comments._id": id },
    { "comments.$": 1 }
  );
  const comment = copyObject(findedComment);
  if (!comment?.comments?.[0])
    throw createHttpError.NotFound("comment not found");
  return comment?.comments?.[0];
}

module.exports = {
  createCommentForBlog,
};
