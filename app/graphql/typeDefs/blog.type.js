const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { userType, publicCategoryType } = require("./public.type");
const { commentType } = require("./comment.type");

const blogType = new GraphQLObjectType({
  name: "blogType",
  fields: {
    _id: { type: GraphQLString },
    author: { type: userType },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    shortText: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    image: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: new GraphQLList(publicCategoryType) },
    comments : {type : new GraphQLList(commentType)},
    likes : {type : new GraphQLList(userType)},
    disLikes : {type : new GraphQLList(userType)},
    bookmark : {type : new GraphQLList(userType)},
  },
});

module.exports = {
  blogType,
};
