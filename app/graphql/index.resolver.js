const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
// query , mutations, schema, types
const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: {
    blogs: {
      type: new GraphQLList(new GraphQLObjectType({
        name: "blogsType",
        fields: {
          id: { type: GraphQLInt },
          title: { type: GraphQLString },
          text: { type: GraphQLString },
          image: { type: GraphQLString },
        },
      })),
      resolve: () => {
        return [{
          id: 1,
          title: "titleOfBlog",
          text: "textOfBlog",
          image: "imageOfBlog",
        }];
      },
    },
  },
});
const rootMutations = new GraphQLObjectType({
  name: "mutations",
  fields: {},
});
const graphqlSchema = new GraphQLSchema({
  query: rootQuery,
//   mutation: rootMutations,
});

module.exports = {
  graphqlSchema,
};
