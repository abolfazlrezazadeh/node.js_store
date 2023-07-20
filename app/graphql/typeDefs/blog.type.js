const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { authorType, categoryType } = require("./public.type");

const blogType = new GraphQLObjectType({
  name: "blogType",
  fields: {
    _id: { type: GraphQLString },
    author: { type: authorType },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    shortText: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    image: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: categoryType },
  },
});

module.exports = {
    blogType
}