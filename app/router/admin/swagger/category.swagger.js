/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags : [category(adminPanel)]
 *          summary : create new category title
 *          parameters:
 *              -     in: header
 *                    name: access-token
 *                    required: true
 *                    type: string
 *                    value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk
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

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *         tags : [category(adminPanel)]
 *         summary : get all parents of categories
 *         parameters:
 *              -     in: header
 *                    name: access-token
 *                    required: true
 *                    type: string
 *                    value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk
 *         responses:
 *              200:
 *                 description : successful
 *              404:
 *                 description: not successful
 */

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *         tags : [category(adminPanel)]
 *         summary : get all child of parents category
 *         parameters:
 *              -    in: header
 *                   name: access-token
 *                   required: true
 *                   type: string
 *                   value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk
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

/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *         tags : [category(adminPanel)]
 *         summary : get all categories with out populate and nested structure
 *         parameters:
 *              -    in: header
 *                   name: access-token
 *                   required: true
 *                   type: string
 *                   value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk
 *         responses:
 *              200:
 *                 description : successful
 *              404:
 *                 description: not successful
 */

/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *         tags : [category(adminPanel)]
 *         summary : get all categories with nested structure
 *         parameters:
 *              -     in: header
 *                    name: access-token
 *                    required: true
 *                    type: string
 *                    value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk
 *         responses:
 *              200:
 *                 description : successful
 *              404:
 *                 description: not successful
 */

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *         tags : [category(adminPanel)]
 *         summary : delete category By id
 *         parameters:
 *              -     in: header
 *                    name: access-token
 *                    required: true
 *                    type: string
 *                    value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk
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

/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *         tags : [category(adminPanel)]
 *         summary : get category By id
 *         parameters:
 *              -     in: header
 *                    name: access-token
 *                    required: true
 *                    type: string
 *                    value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk
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

/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags : [category(adminPanel)]
 *          summary : edit category with id
 *          parameters:
 *              -     in: header
 *                    name: access-token
 *                    required: true
 *                    type: string
 *                    value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk
 *              -     in: path
 *                    type : string
 *                    required : true
 *                    name : id
 *              -     in: formData
 *                    required : true
 *                    type : string
 *                    name : title
 *          responses:
 *               200:
 *                  description : successfully
 *               400:
 *                  description : not successfully
 */