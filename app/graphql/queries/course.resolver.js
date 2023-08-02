const { GraphQLList } = require("graphql");
const { courseType } = require("../typeDefs/course.type");
const { courseModel } = require("../../model/course");

const courseResolver = {
  type: new GraphQLList(courseType),
  resolve: async (_, args, context, info) => {
    // const { req } = context;
    // req.user = await vrefiyAccessTokenInGraphQL(req);
    return await courseModel
      .find({})
      .populate([{ path: "teacher" }, { path: "category" }]);
  },
};

module.exports = {
  courseResolver,
};
