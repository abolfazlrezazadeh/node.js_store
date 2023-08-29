const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { userType, publicCategoryType } = require("./public.type");
const { commentType } = require("./comment.type");
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
    supplier: { type: userType },
    comments : {type : new GraphQLList(commentType)},
    likes : {type : new GraphQLList(userType)},
    disLikes : {type : new GraphQLList(userType)},
    bookmark : {type : new GraphQLList(userType)},
  },
});



module.exports = {
    productType
}