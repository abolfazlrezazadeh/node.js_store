const {
  userAuthController,
} = require("../../http/controller/user/auth/auth.controller");

const router = require("express").Router();

// yaml format

/**
 * @swagger
 * tags:
 *  name: user authentication
 *  description: user auth section
 */

/**
 * @swagger
 *  /user/auth/sign-in:
 *      post:
 *          summary: login user with phone number in user panel
 *          tags: [user authentication]
 *          description : one time password (OTP) sign-in
 *          parameters:
 *          -   name: phone
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */

router.post("/auth/sign-in", userAuthController.signIn);

module.exports = {
  userAuthRouter: router,
};
