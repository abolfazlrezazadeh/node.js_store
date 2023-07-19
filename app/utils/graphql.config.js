const { graphqlSchema } = require("../graphql/index.graphQL");

function configGraphql(req, res) {
    return {
      schema: graphqlSchema,
      //ui
      graphiql: true,
      context: { req, res },
    };
  }

  module.exports = {
    configGraphql
  }