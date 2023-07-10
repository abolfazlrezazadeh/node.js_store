const {roleController} = require("../../http/controller/admin/RBAC/role.controller");
const { StringToArray } = require("../../http/middleware/stringatoArray");
const router = require("express").Router();
const multer = require("multer");
const upload = multer();

router.post("/add",StringToArray("premissions"),  roleController.createRole);
router.get("/list", roleController.getAllRoles);
router.delete("/remove/:field", roleController.removeRole);
router.patch("/update/:id", upload.none(),StringToArray("premissions"), roleController.updateRolById);

module.exports = {
  roleAdminApiRoute: router,
};
