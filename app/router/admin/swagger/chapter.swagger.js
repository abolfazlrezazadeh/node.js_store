/**
 * @swagger
 *  /admin/chapter/add-chapter:
 *      put:
 *          tags: [chapter(adminPanel)]
 *          summary: add new chapter for course
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg0MjIyMzY0LCJleHAiOjE2ODUwODYzNjR9.s4-RtizTqKILVkW-Mgpa4ARfk9Iz_yQmnYWjE3naD-M
 *              -   in: formData
 *                  name: id
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true
 *                  description : title of chapter
 *              -   in: formData
 *                  name: text
 *                  type: string
 *                  description : text of chapter
 *          responses:
 *               200:
 *                  description: successfull
 *               400:
 *                  description: unsuccessfull
 */
/**
 * @swagger
 *  /admin/chapter/list/{courseId}:
 *      get:
 *          tags: [chapter(adminPanel)]
 *          summary: get list of chapters in course
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg0MjIyMzY0LCJleHAiOjE2ODUwODYzNjR9.s4-RtizTqKILVkW-Mgpa4ARfk9Iz_yQmnYWjE3naD-M
 *              -   in: path
 *                  name: courseId
 *                  required: true
 *                  type: string
 *          responses:
 *               200:
 *                  description: successfull
 *               400:
 *                  description: unsuccessfull
 */
/**
 * @swagger
 *  /admin/chapter/remove/{chapterId}:
 *      patch:
 *          tags: [chapter(adminPanel)]
 *          summary: remove a chapter from course
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg0MjIyMzY0LCJleHAiOjE2ODUwODYzNjR9.s4-RtizTqKILVkW-Mgpa4ARfk9Iz_yQmnYWjE3naD-M
 *              -   in: path
 *                  name: chapterId
 *                  required: true
 *                  type: string
 *          responses:
 *               200:
 *                  description: successfull
 *               400:
 *                  description: unsuccessfull
 */
/**
 * @swagger
 *  /admin/chapter/update/{chapterId}:
 *      patch:
 *          tags: [chapter(adminPanel)]
 *          summary: update a chapter from course
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg0MjIyMzY0LCJleHAiOjE2ODUwODYzNjR9.s4-RtizTqKILVkW-Mgpa4ARfk9Iz_yQmnYWjE3naD-M
 *              -   in: path
 *                  name: chapterId
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  description : title of chapter
 *              -   in: formData
 *                  name: text
 *                  type: string
 *                  description : text of chapter
 *          responses:
 *               200:
 *                  description: successfull
 *               400:
 *                  description: unsuccessfull
 */
