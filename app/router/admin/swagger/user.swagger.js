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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg1OTA0MDg4LCJleHAiOjE2ODY3NjgwODh9.I7s2AGIyN575tBhdiKP-MY8dwQ7daAAh3KuD0RoLrB8
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