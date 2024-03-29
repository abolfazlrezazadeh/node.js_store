const { GraphQLList, GraphQLString } = require("graphql");
const { courseType } = require("../typeDefs/course.type");
const { courseModel } = require("../../model/course");

const courseResolver = {
  type: new GraphQLList(courseType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args, context, info) => {
    const { category } = args;
    const findQuery = category ? { category } : {};
    // const { req } = context;
    // req.user = await vrefiyAccessTokenInGraphQL(req);
    return await courseModel
      .find(findQuery)
      .populate([
        { path: "teacher" },
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
  courseResolver,
};
