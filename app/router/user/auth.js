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
 *  /user/get-otp:
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

router.post("/get-otp", userAuthController.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [user authentication]
 *          summary: check otp in user controller
 *          description : check otp with phone code expires in
 *          parameters:
 *          -   name: phone
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code
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
 *        
 */
router.post("/check-otp", userAuthController.checkOtp);
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *           summary: send refresh token for get new token and refresh token
 *           tags: [user authentication]
 *           description: new token
 *           parameters:
 *               -    in: formData
 *                    required: true
 *                    type: string
 *                    name: refreshToken
 *           responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/refresh-token", userAuthController.refreshToken)

module.exports = {
  userAuthRouter: router,
};
