const {userController} = require("../../http/controller/user/user.controller");
const { checkPremission } = require("../../http/middleware/permission.guard");
const { PERMISSIONS } = require("../../utils/constants");

const router= require("express").Router();

router.get("/list", checkPremission([PERMISSIONS.ADMIN]), userController.getAllUsers);

router.patch("/update-profile", userController.updateUser);

router.get("/profile",checkPremission([]), userController.userProfile);

module.exports = {
    userAdminApiRouter : router,
}