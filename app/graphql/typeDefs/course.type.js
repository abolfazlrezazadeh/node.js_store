const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { userType, publicCategoryType } = require("./public.type");
const { commentType } = require("./comment.type");

const episodesType = new GraphQLObjectType({
  name: "episodesType",
  fields: {
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    type: { type: GraphQLString },
    time: { type: GraphQLString },
    videoAddress: { type: GraphQLString },
    videoUrl: { type: GraphQLString },
  },
});
const chapterType = new GraphQLObjectType({
  name: "chapterType",
  fields: {
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    episodes: { type: new GraphQLList(episodesType) },
  },
});
const courseType = new GraphQLObjectType({
  name: "courseType",
  fields: {
    title: { type: GraphQLString },
    bio: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: publicCategoryType },
    price: { type: GraphQLString },
    disCount: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
    time: { type: GraphQLString },
    teacher: { type: userType },
    chapters: { type: new GraphQLList(chapterType) },
    comments : {type : new GraphQLList(commentType)}
  },
});

module.exports = {
  courseType,
};
