const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { userType } = require("./public.type");

const commentAnswerType = new GraphQLObjectType({
  name: "commentAnswerType",
  fields: {
    _id : { type: GraphQLString },
    user: { type: userType },
    comment: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    show: { type: GraphQLBoolean },
  },
});
const commentType = new GraphQLObjectType({
  name: "commentType",
  fields: {
    _id : { type: GraphQLString },
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
