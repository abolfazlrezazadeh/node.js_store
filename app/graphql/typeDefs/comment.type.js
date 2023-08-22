const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { userType, anyType } = require("./public.type");

const commentAnswerType = new GraphQLObjectType({
  name: "commentAnswerType",
  fields: {
    user: { type: userType },
    comment: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    show: { type: GraphQLBoolean },
  },
});
const commentType = new GraphQLObjectType({
  name: "commentType",
  fields: {
    user: { type: userType },
    comment: { type: GraphQLString },
    answers: { type: new GraphQLList(commentAnswerType) },
    show: { type: GraphQLBoolean },
    openToComment: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
  },
});


module.exports = {
  commentType,
};
