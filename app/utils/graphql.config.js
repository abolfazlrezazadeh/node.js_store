const { graphqlSchema } = require("../graphql/index.resolver");

function configGraphql(req, res) {
    return {
      schema: graphqlSchema,
      graphiql: true,
      context: { req, res },
    };
  }

  module.exports = {
    configGraphql
  }