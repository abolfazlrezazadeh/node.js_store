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
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjgzNzA1MTA4LCJleHAiOjE2ODQ1NjkxMDh9.DcMdtgxBxUqJIpU0fo3KqQVLkaPlF-cyIvO6-XUBZlU
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
 *          summary: add new chapter for course
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjgzNzA1MTA4LCJleHAiOjE2ODQ1NjkxMDh9.DcMdtgxBxUqJIpU0fo3KqQVLkaPlF-cyIvO6-XUBZlU
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
