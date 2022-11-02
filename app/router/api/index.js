const homeController = require("../../http/controller/api/home.controller");
const {
  vrefiyAccessToken,
} = require("../../http/middleware/verifyAccesssToken");
const router = require("express").Router();

// yaml format

/**
 * @swagger
 * tags:
 *  name: index page
 *  description: index page route and data
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [index page]
 *      description: get all need data for index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer yourToken ...
 *      responses:
 *           200:
 *               description: success
 *           404:
 *               description: not found
 */

router.get("/", vrefiyAccessToken,  homeController.idexPage);
module.exports = {
  homeRoutes: router,
};
