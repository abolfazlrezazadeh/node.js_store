const controller = require("../controller");

class namespacecontroller extends controller {}

module.exports = {
  namespaceController: new namespacecontroller(),
};
