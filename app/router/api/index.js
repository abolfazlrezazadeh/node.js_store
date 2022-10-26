const homeController = require("../../http/controller/api/home.controller");
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
*      responses:
*           200:
*               description: success
*           404:
*               description: not found
*/

router.get("/", homeController.idexPage);
module.exports = {
  homeRoutes: router,
};
