const {userController} = require("../../http/controller/user/user.controller");

const router= require("express").Router();

router.get("/list", userController.getAllUsers);

module.exports = {
    userAdminApiRouter : router,
}