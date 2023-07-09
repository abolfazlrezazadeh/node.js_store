const {premissionController} = require("../../http/controller/admin/RBAC/premission.controller");

const router = require("express").Router();

router.get("/list", premissionController.getAllPremissions);

module.exports = {
  premissionAdminApiRoute: router,
};
