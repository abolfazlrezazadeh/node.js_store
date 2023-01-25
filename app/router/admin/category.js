const router = require("express").Router();
const {categoryController} = require("../../http/controller/admin/category.controller");



/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags : [adminPanel]
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
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *         tags : [adminPanel]
 *         summary : get all parents of categories
 *         responses:
 *              200:
 *                 description : successful
 *              404:
 *                 description: not successful
 */
router.get("/parents" , categoryController.getAllParents);
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *         tags : [adminPanel]
 *         summary : get all child of parents category
 *         parameters:
 *              -    in: path
 *                   type: string
 *                   required : true
 *                   name : parent
 *         responses:
 *              200:
 *                 description : successful
 *              404:
 *                 description: not successful
 */
router.get("/children/:parent" , categoryController.getChildOfParents);
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *         tags : [adminPanel]
 *         summary : get all categories
 *         responses:
 *              200:
 *                 description : successful
 *              404:
 *                 description: not successful
 */
router.get("/all" , categoryController.getAllCategory);

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *         tags : [adminPanel]
 *         summary : delete category By id
 *         parameters:
 *              -    in: path
 *                   type: string
 *                   required : true
 *                   name : id
 *         responses:
 *              200:
 *                 description : successful
 *              404:
 *                 description: not successful
 */
router.delete("/remove/:id" , categoryController.removeCategory);
module.exports = {
  categoryRoutes: router,
};
