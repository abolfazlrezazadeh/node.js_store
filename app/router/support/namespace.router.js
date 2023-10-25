const {
  namespaceController,
} = require("../../http/controller/support/namespace.controller");

const router = require("express").Router();
router.post("/add", namespaceController.addNamespace);
router.get("/list", namespaceController.getListOfNamspaces);

module.exports = {
  namespaceAdminRoute: router,
};
