const router = require("express").Router();
const {categoryController} = require("../../http/controller/admin/category.controller");



/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags : [admin-Panel]
 *          summary : create new category title
 *          parameters:
 *              -     in: formData
 *                    type : string
 *                    required : true
 *                    name : title
 *              -     in: formData
 *                    required : false
 *                    type : string
 *                    name : parent
 *          responses:
 *               200:
 *                  description : successfully
 *               400:
 *                  description : not successfully
 */

router.post("/add" , categoryController.addCategory);

module.exports = {
  categoryRoutes: router,
};
