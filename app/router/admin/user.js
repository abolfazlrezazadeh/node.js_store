const {userController} = require("../../http/controller/user/user.controller");

const router= require("express").Router();

router.get("/list", userController.getAllUsers);

router.patch("/update-profile", userController.updateUser);

module.exports = {
    userAdminApiRouter : router,
}