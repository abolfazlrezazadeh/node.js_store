/**
 * @swagger
 *  tags:
 *      -   name : support(supportPanel)
 *          description : management chats
 */

/**
 * @swagger
 *  /support/namespace/add:
 *      post:
 *          tags : [support(supportPanel)]
 *          summary : add namespace 
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjgxMTk3MDM4LCJleHAiOjE2ODIwNjEwMzh9.Wu3l2GlWgKPhX1qmzqRTOrB0vnvTh86XOJUU4wZyrRc   
 *              -   in: formData
 *                  name: title
 *                  description: the title of the nmespace
 *                  required: true
 *                  type: string         
 *              -   in: formData
 *                  name: endpoints
 *                  description: the endpoint of the nmespace
 *                  required: true
 *                  type: string         
 * 
 *          responses:
 *              200:
 *                  description : success 
 */


/**
 * @swagger
 *  /support/room/add:
 *      post:
 *          tags : [support(supportPanel)]
 *          summary : add new rooms
 *          parameters:
 *              -   in: header
 *                  name: access-token
 *                  required: true
 *                  type: string
 *                  value : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6OTM5MjMyNzQ5MywiaWF0IjoxNjgxMTk3MDM4LCJleHAiOjE2ODIwNjEwMzh9.Wu3l2GlWgKPhX1qmzqRTOrB0vnvTh86XOJUU4wZyrRc   
 *              -   in: formData
 *                  name: name
 *                  description: the title of the nmespace
 *                  required: true
 *                  type: string         
 *              -   in: formData
 *                  name: description
 *                  description: the description of the room
 *                  required: true
 *                  type: string         
 *              -   in: formData
 *                  name: image
 *                  description: the image of the room
 *                  required: true
 *                  type: file         
 *              -   in: formData
 *                  name: namespace
 *                  description: the name of the namespace
 *                  required: true
 *                  type: string         
 * 
 *          responses:
 *              200:
 *                  description : success - get array of blogs
 */