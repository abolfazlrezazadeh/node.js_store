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
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg1MjU3NzUyLCJleHAiOjE2ODYxMjE3NTJ9.AnHuinUN9pr8KbvLQ_9LxztGKSbU_0Yp03_V1j-Mvl0
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

/**
 * @swagger
 *  /admin/episode/remove/{episodeId}:
 *      delete:
 *          tags: [episode(adminPanel)]
 *          summary: remove a episodeof chapter
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg1MjU3NzUyLCJleHAiOjE2ODYxMjE3NTJ9.AnHuinUN9pr8KbvLQ_9LxztGKSbU_0Yp03_V1j-Mvl0
 *              -   in: path
 *                  name: episodeId
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
 *  /admin/episode/update/{episodeId}:
 *      patch:
 *          tags: [episode(adminPanel)]
 *          summary: adit episode of chapter
 *          consumes:
 *              -   multipart/form-data
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required : true
 *                  type: string
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjg1MjU3NzUyLCJleHAiOjE2ODYxMjE3NTJ9.AnHuinUN9pr8KbvLQ_9LxztGKSbU_0Yp03_V1j-Mvl0
 *              -   in: path
 *                  name: episodeId
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: text
 *                  type: string
 *              -   in: formData
 *                  name: video
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