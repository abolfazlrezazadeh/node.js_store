const namespaceSocketHandler = require("./namespace.socket");

module.exports = {
  socketHandler: (io) => {
    new namespaceSocketHandler(io).initConnection();
    new namespaceSocketHandler(io).createNamespaceConnection();
  },
};
