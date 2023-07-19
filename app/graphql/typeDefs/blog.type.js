const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { authorType } = require("./public.type");

const blogType = new GraphQLObjectType({
  name: "blogType",
  fields: {
    _id: { type: GraphQLString },
    author: { type: authorType },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    shortText: { type: GraphQLString },
    image: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: GraphQLString },
    // comments: { type: new GraphQLList() },
  },
});

module.exports = {
    blogType
}