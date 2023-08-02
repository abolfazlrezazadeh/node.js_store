const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLScalarType,
  Kind,
} = require("graphql");
const { toObject, parseLiteral } = require("../utills");

const authorType = new GraphQLObjectType({
  name: "authorType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  },
});
const anyType = new GraphQLScalarType({
  name: "anyType",
  parseValue: toObject,
  serialize: toObject,
  parseLiteral: parseLiteral,
});
const publicCategoryType = new GraphQLObjectType({
  name: "publicCategoryType",
  fields: {
    _id: { type: GraphQLString }, 
    title: { type: GraphQLString },
    // children: { type: new GraphQLList(anyType) },
  },
});

module.exports = {
  authorType,
  anyType,
  publicCategoryType,
};
