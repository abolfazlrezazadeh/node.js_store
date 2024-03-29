const {premissionController} = require("../../http/controller/admin/RBAC/premission.controller");
const multer = require("multer");
const upload = multer();
const router = require("express").Router();

router.post("/add",upload.none(), premissionController.createPremission);
router.get("/list", premissionController.getAllPremissions);
router.delete("/remove/:id", premissionController.removePremissionById);
router.patch("/update/:id",upload.none(), premissionController.updatePremissionById);

module.exports = {
  premissionAdminApiRoute: router,
};
