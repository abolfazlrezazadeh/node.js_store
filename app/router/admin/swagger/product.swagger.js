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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc5OTg0OTgxLCJleHAiOjE2ODAwNzEzODF9.EwOKNdY_45tuP_iElgN_uFcuNa_rCsYbJOwSq2_gyW0
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
 *              -   in: formData
 *                  name: colors
 *                  type: array
 *                  items:
 *                       type: string
 *          responses:
 *               201:
 *                  description: created
 *               400:
 *                  description: failed
 */

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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc5OTg0OTgxLCJleHAiOjE2ODAwNzEzODF9.EwOKNdY_45tuP_iElgN_uFcuNa_rCsYbJOwSq2_gyW0
 *              -   in: query
 *                  name: search
 *                  type: string
 *          responses:
 *               200:
 *                  description: success
 *               400:
 *                  description: unsuccessfull
 */

/**
 * @swagger
 *  /admin/product/{id}:
 *      get:
 *          tags: [product(adminPanel)]
 *          summary: get a product by id
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc5OTg0OTgxLCJleHAiOjE2ODAwNzEzODF9.EwOKNdY_45tuP_iElgN_uFcuNa_rCsYbJOwSq2_gyW0
 *              -   in: path
 *                  name: id
 *                  required : true
 *                  type: string
 *          responses:
 *               200:
 *                  description: success
 *               400:
 *                  description: unsuccessfull
 */

/**
 * @swagger
 *  /admin/product/remove/{id}:
 *      delete:
 *          tags: [product(adminPanel)]
 *          summary: remove a product by id
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc5OTg0OTgxLCJleHAiOjE2ODAwNzEzODF9.EwOKNdY_45tuP_iElgN_uFcuNa_rCsYbJOwSq2_gyW0
 *              -   in: path
 *                  name: id
 *                  required : true
 *                  type: string
 *          responses:
 *               200:
 *                  description: success
 *               400:
 *                  description: unsuccessfull
 */

/**
 * @swagger
 *  /admin/product/edit/{id}:
 *      patch:
 *          tags: [product(adminPanel)]
 *          summary: update product
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc5OTg0OTgxLCJleHAiOjE2ODAwNzEzODF9.EwOKNdY_45tuP_iElgN_uFcuNa_rCsYbJOwSq2_gyW0
 *              -   in: path
 *                  name: id
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: bio
 *                  type: string
 *              -   in: formData
 *                  name: description
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  type: array
 *                  items:
 *                      type: string
 *              -   in: formData
 *                  name: category
 *                  type: string
 *              -   in: formData
 *                  name: price
 *                  type: string
 *              -   in: formData
 *                  name: count
 *                  type: string
 *              -   in: formData
 *                  name: disCount
 *                  type: string
 *              -   in: formData
 *                  name: images
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
 *              -   in: formData
 *                  name: colors
 *                  type: array
 *                  items:
 *                       type: string
 *          responses:
 *               201:
 *                  description: created
 *               400:
 *                  description: failed
 */