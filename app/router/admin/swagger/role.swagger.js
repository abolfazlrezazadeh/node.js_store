/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC(adminPanel)]
 *          summary: create new role
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MzkyMzI3NDkzIiwiaWF0IjoxNjg4NDU4MzQ3LCJleHAiOjE2ODkzMjIzNDd9.JStuGyhHdh3d9VBYsZFLZjFu2Z8ar_A_Au3hyvgwqOw
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: premissions
 *                  type: array
 *          responses:
 *               201:
 *                  description: created
 *               400:
 *                  description: failed
 */

/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags: [RBAC(adminPanel)]
 *          summary: edit the role
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MzkyMzI3NDkzIiwiaWF0IjoxNjg4NDU4MzQ3LCJleHAiOjE2ODkzMjIzNDd9.JStuGyhHdh3d9VBYsZFLZjFu2Z8ar_A_Au3hyvgwqOw
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: premissions
 *                  description: blog / course / product
 *                  type: string
 *                  enum: 
 *                      -   blog
 *                      -   course
 *                      -   product
 *          responses:
 *               200:
 *                  description: created
 *               400:
 *                  description: failed
 */

/**
 * @swagger
 *  /admin/role/remove/{id}:
 *      delete:
 *          tags: [RBAC(adminPanel)]
 *          summary: edit the role
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MzkyMzI3NDkzIiwiaWF0IjoxNjg4NDU4MzQ3LCJleHAiOjE2ODkzMjIzNDd9.JStuGyhHdh3d9VBYsZFLZjFu2Z8ar_A_Au3hyvgwqOw
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *               200:
 *                  description: created
 *               400:
 *                  description: failed
 */

/**
 * @swagger
 *  /admin/role/list:
 *      get:
 *          tags: [RBAC(adminPanel)]
 *          summary: get the roles 
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MzkyMzI3NDkzIiwiaWF0IjoxNjg4NDU4MzQ3LCJleHAiOjE2ODkzMjIzNDd9.JStuGyhHdh3d9VBYsZFLZjFu2Z8ar_A_Au3hyvgwqOw
 *          responses:
 *               200:
 *                  description: created
 *               400:
 *                  description: failed
 */