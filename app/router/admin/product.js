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
 *              -   application/x-www-form-urlencoded
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc3NzUyMjgyLCJleHAiOjE2Nzc4Mzg2ODJ9.ub9nZEx2_-Bb9I8z_PTR5ph0CxUK5TOnmcdKgicQCPQ
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
 *                  name: disCount
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required : true
 *                  type: file
 *              -   in: formData
 *                  example: 10 cm or 10/50 cm
 *                  name: height
 *                  description: height of product packet
 *                  type: string
 *              -   in: formData
 *                  name: width
 *                  example: 10 cm or 10/50 cm
 *                  description: width of product packet
 *                  type: string
 *              -   in: formData
 *                  name: length
 *                  example: 10 cm or 10/50 cm
 *                  description: length of product packet
 *                  type: string
 *              -   in: formData
 *                  name: weight
 *                  example: 10 cm or 10/50 cm
 *                  description: weight of product packet
 *                  type: string
 *          responses:
 *               201:
 *                  description: success
 *               400:
 *                  description: failed
 */
router.post(
  "/add",
  uploadFile.single("image"),
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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc3NzUyMjgyLCJleHAiOjE2Nzc4Mzg2ODJ9.ub9nZEx2_-Bb9I8z_PTR5ph0CxUK5TOnmcdKgicQCPQ
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
