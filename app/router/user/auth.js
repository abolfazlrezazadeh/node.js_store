const { userAuthController } = require("../../http/controller/user/auth/auth.controller");

const router = require("express").Router();

router.post("/auth/sign-in" , userAuthController.signIn )



module.exports ={
    userAuthRouter : router
}