/**
 * @swagger
 *  /admin/course/list:
 *      get:
 *          tags: [course(adminPanel)]
 *          summary: get all of courses
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg1MjU3NzUyLCJleHAiOjE2ODYxMjE3NTJ9.AnHuinUN9pr8KbvLQ_9LxztGKSbU_0Yp03_V1j-Mvl0
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description : search in text bio description
 *          responses:
 *               200:
 *                  description: success
 *               400:
 *                  description: unsuccessfull
 */

/**
 * @swagger
 *  /admin/course/add:
 *      post:
 *          tags: [course(adminPanel)]
 *          summary: create new course
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg1MjU3NzUyLCJleHAiOjE2ODYxMjE3NTJ9.AnHuinUN9pr8KbvLQ_9LxztGKSbU_0Yp03_V1j-Mvl0
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
 *                  name: disCount
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  required : true
 *                  type: file
 *                  format: binary
 *              -   in: formData
 *                  name: type
 *                  description: cash / free / premium
 *                  type: string
 *                  enum: 
 *                      -   free
 *                      -   cash
 *                      -   premium
 *          responses:
 *               201:
 *                  description: created
 *               400:
 *                  description: failed
 */

/**
 * @swagger
 *  /admin/course/{id}:
 *      get:
 *          tags: [course(adminPanel)]
 *          summary: get a course
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg1MjU3NzUyLCJleHAiOjE2ODYxMjE3NTJ9.AnHuinUN9pr8KbvLQ_9LxztGKSbU_0Yp03_V1j-Mvl0
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description : id box
 *          responses:
 *               200:
 *                  description: success
 *               404:
 *                  description: notFound
 */

/**
 * @swagger
 *  /admin/course/update/{courseId}:
 *      patch:
 *          tags: [course(adminPanel)]
 *          summary: update course by id
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg1MjU3NzUyLCJleHAiOjE2ODYxMjE3NTJ9.AnHuinUN9pr8KbvLQ_9LxztGKSbU_0Yp03_V1j-Mvl0
 *              -   in: path
 *                  name: courseId
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
 *                  name: disCount
 *                  type: string
 *              -   in: formData
 *                  name: image
 *                  type: file
 *                  format: binary
 *              -   in: formData
 *                  name: type
 *                  description: cash / free / premium
 *                  type: string
 *                  enum: 
 *                      -   free
 *                      -   cash
 *                      -   premium
 *          responses:
 *               201:
 *                  description: created
 *               400:
 *                  description: failed
 */
