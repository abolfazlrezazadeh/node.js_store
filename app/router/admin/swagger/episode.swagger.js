/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [episode(adminPanel)]
 *          summary: add episode for chapter
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg0MjIyMzY0LCJleHAiOjE2ODUwODYzNjR9.s4-RtizTqKILVkW-Mgpa4ARfk9Iz_yQmnYWjE3naD-M
 *              -   in: formData
 *                  name: courseId
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: chapterId
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: video
 *                  required : true
 *                  value: 00:05:21
 *                  type: file
 *              -   in: formData
 *                  name: type
 *                  description: lock / unlock 
 *                  type: string
 *                  enum: 
 *                      -   lock
 *                      -   unlock
 *          responses:
 *               201:
 *                  description: created
 *               400:
 *                  description: failed
 */
