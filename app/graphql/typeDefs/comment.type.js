const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const { userType, anyType } = require("./public.type");

const parentOfCommentType = new GraphQLObjectType({
  name: "parentOfCommentType",
  fields: {
    user: { type: userType },
    comment: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    show: { type: GraphQLBoolean },
    openToComment: { type: GraphQLBoolean },
  },
});
const commentType = new GraphQLObjectType({
  name: "commentType",
  fields: {
    user: { type: userType },
    comment: { type: GraphQLString },
    parent: { type: parentOfCommentType },
    show: { type: GraphQLBoolean },
    openToComment: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
  },
});


module.exports = {
  commentType,
};
