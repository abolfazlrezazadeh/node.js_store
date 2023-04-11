/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags : [blog(adminPanel)]
 *          summary : get all blogs
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjgxMTk3MDM4LCJleHAiOjE2ODIwNjEwMzh9.Wu3l2GlWgKPhX1qmzqRTOrB0vnvTh86XOJUU4wZyrRc            
 * 
 *          responses:
 *              200:
 *                  description : success - get array of blogs
 */

/**
 * @swagger
 *  /admin/blogs/add:
 *      post:
 *          tags : [blog(adminPanel)]
 *          summary : create blog
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjgxMTk3MDM4LCJleHAiOjE2ODIwNjEwMzh9.Wu3l2GlWgKPhX1qmzqRTOrB0vnvTh86XOJUU4wZyrRc
 *              -   in: formData
 *                  name : title
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name : text
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name : shortText
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name: tags
 *                  example: tag#tag2#
 *                  type: string
 *                  required : false
 *              -   in: formData
 *                  name : category
 *                  type: string
 *                  required : true
 *              -   in: formData
 *                  name : image
 *                  type: file
 *                  required : true
 * 
 *          responses:
 *              200:
 *                  description : success 
 */

/**
 * @swagger
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags : [blog(adminPanel)]
 *          summary : edit and update blog
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk
 *              -   in: path
 *                  name : id
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name : title
 *                  type: string
 *              -   in: formData
 *                  name : text
 *                  type: string
 *              -   in: formData
 *                  name : shortText
 *                  type: string
 *              -   in: formData
 *                  name: tags
 *                  example: tag#tag2#
 *                  type: string
 *                  required : false
 *              -   in: formData
 *                  name : category
 *                  type: string
 *              -   in: formData
 *                  name : image
 *                  type: file
 * 
 *          responses:
 *              200:
 *                  description : success 
 */

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *         tags : [blog(adminPanel)]
 *         summary : get blog By id and populate this field
 *         parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk            
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
 *  /admin/blogs/remove/{id}:
 *      delete:
 *         tags : [blog(adminPanel)]
 *         summary : delete blog By id 
 *         parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjc2ODgwNjAzLCJleHAiOjE2NzY5NjcwMDN9.j2sKPsfeRy-CIKTSPEgCXkQWVq-ZHQO-8SIjGOrRvkk            
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