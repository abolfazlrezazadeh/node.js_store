const {roleController} = require("../../http/controller/admin/RBAC/role.controller");

const router = require("express").Router();


router.get("/list", roleController.getAllRoles);

module.exports = {
  roleAdminApiRoute: router,
};
