/**
 * @swagger
 *  /admin/user/list:
 *      get:
 *          tags: [user(adminPanel)]
 *          summary: get list of users
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MzkyMzI3NDkzIiwiaWF0IjoxNjg4NDU4MzQ3LCJleHAiOjE2ODkzMjIzNDd9.JStuGyhHdh3d9VBYsZFLZjFu2Z8ar_A_Au3hyvgwqOw
 *              -   in: query
 *                  name: search
 *                  description: search in firstName ,lastName ,userName ,phone and email
 *                  type: string
 *          responses:
 *               200:
 *                  description: success
 *               400:
 *                  description: unsuccessfull
 */
/**
 * @swagger
 *  /admin/user/update-profile:
 *      patch:
 *          tags: [user(adminPanel)]
 *          summary: update user profile
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA5MzkyMzI3NDkzIiwiaWF0IjoxNjg4NDU4MzQ3LCJleHAiOjE2ODkzMjIzNDd9.JStuGyhHdh3d9VBYsZFLZjFu2Z8ar_A_Au3hyvgwqOw
 *              -   in: formData
 *                  name: first_name
 *                  type: string
 *              -   in: formData
 *                  name: last_name
 *                  type: string
 *              -   in: formData
 *                  name: username
 *                  type: string
 *              -   in: formData
 *                  name: email
 *                  type: string
 *          responses:
 *               200:
 *                  description: success
 *               400:
 *                  description: unsuccessfull
 */