const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { authorType, publicCategoryType } = require("./public.type");
const featureType = new GraphQLObjectType({
    name : "featureType" , 
    fields : {
        length: { type: GraphQLString },
        weight: { type: GraphQLString },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        colors: { type: new GraphQLList(GraphQLString) },
        madeIn: { type: GraphQLString },
    }
})

const productType = new GraphQLObjectType({
  name: "productType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    bio: { type: GraphQLString },
    description: { type: GraphQLString },
    imagesURL: { type: new GraphQLList(GraphQLString) },
    images: { type: GraphQLString },
    type: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: { type: publicCategoryType },
    count: { type: GraphQLInt },
    disCount: { type: GraphQLInt },
    price: { type: GraphQLInt },
    feature: { type: featureType },
    supplier: { type: authorType },
  },
});



module.exports = {
    productType
}