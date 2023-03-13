const {
  productController,
} = require("../../http/controller/admin/product.controller");
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
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc4NjI3Mzg3LCJleHAiOjE2Nzg3MTM3ODd9.2ChFjNsIbyndYfdtLlgFpZN2KeupyQqhVm3k4C48zt0
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
 *                  items:
 *                      type: string
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
 *                  name: disCount
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: images
 *                  required : true
 *                  type: array
 *                  items:
 *                      type: file
 *                      format: binary
 *              -   in: formData
 *                  example: 10 cm or 10/50 cm
 *                  name: height
 *                  description: height of product box
 *                  type: string
 *              -   in: formData
 *                  name: width
 *                  example: 10 cm or 10/50 cm
 *                  description: width of product box
 *                  type: string
 *              -   in: formData
 *                  name: length
 *                  example: 10 cm or 10/50 cm
 *                  description: length of product box
 *                  type: string
 *              -   in: formData
 *                  name: weight
 *                  example: 10 cm or 10/50 cm
 *                  description: weight of product box
 *                  type: string
 *          responses:
 *               201:
 *                  description: success
 *               400:
 *                  description: failed
 */
router.post(
  "/add",
  uploadFile.array("images",10),
  StringToArray("tags"),
  productController.addProduct
);
/**
 * @swagger
 *  /admin/product/list:
 *      get:
 *          tags: [product(adminPanel)]
 *          summary: get all of products
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc4NjI3Mzg3LCJleHAiOjE2Nzg3MTM3ODd9.2ChFjNsIbyndYfdtLlgFpZN2KeupyQqhVm3k4C48zt0
 *          responses:
 *               200:
 *                  description: success
 *               400:
 *                  description: unsuccessfull
 */
router.get("/list", productController.getListOfProducts);

module.exports = {
  productAdminApiRoute: router,
};
