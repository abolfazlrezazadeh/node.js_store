const router = require("express").Router();
const bcrypt = require("bcrypt");
const { randomNumberGenerator } = require("../utils/function");

/**
 * @swagger
 *  tags:
 *      name : developer-Router
 *      description : developer utillties
 */

/**
 * @swagger
 *  /developer/password-hash/{password}:
 *      get:
 *          tags : [developer-Router]
 *          summary : hash data wit bcrypt
 *          parameters :
 *              -   in : path
 *                  type : string
 *                  name : password
 *                  required : true
 *          responses:
 *                200:
 *                   description : success
 *                404:
 *                   description : not found
 */
router.get("/password-hash/:password", (req, res, next) => {
  const { password } = req.params;
  const salt = bcrypt.genSaltSync(12);
  return res.send(bcrypt.hashSync(password, salt));
});
/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags : [developer-Router]
 *          summary : get random number
 *          responses:
 *                200:
 *                   description : success
 *                404:
 *                   description : not found
 */
router.get("/random-number", (req, res, next) => {
  return res.send(randomNumberGenerator().toString());
});
module.exports = {
  developerRoute: router,
};
