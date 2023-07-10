/**
 * @swagger
 *  /admin/premission/add:
 *      post:
 *          tags: [RBAC(adminPanel)]
 *          summary: create new premission
 *          consumes:
 *              -   application/x-www-form-urlencoded
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MzkyMzI3NDkzIiwiaWF0IjoxNjg4NDU4MzQ3LCJleHAiOjE2ODkzMjIzNDd9.JStuGyhHdh3d9VBYsZFLZjFu2Z8ar_A_Au3hyvgwqOw
 *              -   in: formData
 *                  name: name
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: description
 *                  type: string
 *          responses:
 *               201:
 *                  description: created
 *               400:
 *                  description: failed
 */

/**
 * @swagger
 *  /admin/premission/update/{id}:
 *      patch:
 *          tags: [RBAC(adminPanel)]
 *          summary: edit the premission
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
 *  /admin/premission/remove/{id}:
 *      delete:
 *          tags: [RBAC(adminPanel)]
 *          summary: edit the premission
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
 *                  description: remove by objectId
 *                  required: true
 *          responses:
 *               200:
 *                  description: created
 *               400:
 *                  description: failed
 */

/**
 * @swagger
 *  /admin/premission/list:
 *      get:
 *          tags: [RBAC(adminPanel)]
 *          summary: get the premissions 
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