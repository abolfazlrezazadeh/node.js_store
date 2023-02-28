const {productController} = require("../../http/controller/admin/product.controller");
const { StringToArray } = require("../../http/middleware/stringatoArray");
const { uploadFile } = require("../../utils/multer");
const router = require("express").Router();

/**
 * @swagger
 *  /admin/product/add:
 *      post:
 *          tags: [product(adminPanel)]
 *          summary: create new product
 *          consumes:
 *              -   application/x-www-form-urlencoded
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc3NTY4MzM0LCJleHAiOjE2Nzc2NTQ3MzR9.4NLFcrPNOkk34DAw14XigjXQguUIyRvNPdVRKxMzSws
 *              -   in: formData
 *                  name: title
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: bio
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: description
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  required : true
 *                  type: array
 *              -   in: formData
 *                  name: category
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: price
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: count
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: discount
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required : true
 *                  type: file
 *          responses:
 *               201: 
 *                  description: success
 *               400:
 *                  description: failed
 */
router.post("/add",uploadFile.single("image"),StringToArray("tags"), productController.addProduct);

module.exports = {
    productAdminApiRoute : router
}