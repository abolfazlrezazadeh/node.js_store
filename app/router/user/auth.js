const {
  userAuthController,
} = require("../../http/controller/user/auth/auth.controller");

const router = require("express").Router();

router.post("/get-otp", userAuthController.getOtp);

router.post("/check-otp", userAuthController.checkOtp);

router.post("/refresh-token", userAuthController.refreshToken)

module.exports = {
  userAuthRouter: router,
};
