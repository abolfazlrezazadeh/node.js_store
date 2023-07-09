const {roleController} = require("../../http/controller/admin/RBAC/role.controller");
const { StringToArray } = require("../../http/middleware/stringatoArray");
const router = require("express").Router();

router.post("/add",StringToArray("premissions"),  roleController.createRole);
router.get("/list", roleController.getAllRoles);

module.exports = {
  roleAdminApiRoute: router,
};
