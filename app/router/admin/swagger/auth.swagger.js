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