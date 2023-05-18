const joi = require("@hapi/joi");
const createError = require("http-errors");
const createCourseSchema = joi.object({
  title: joi
    .string()
    .min(5)
    .error(createError.BadRequest("title is not correct")),
  bio: joi
    .string()
    .min(5)
    .error(createError.BadRequest("bio must be at least 5 letters")),
  description: joi
    .string()
    .min(5)
    .error(createError("description must be at least 5 letters")),
  tags: joi
    .array()
    .min(0)
    .max(20)
    .error(createError.BadRequest("tags must be at least 1 tag")),
  category: joi
    .string()
    .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .error(createError.BadRequest("category is not correct")),
  price: joi
    .number()
    .min(1000)
    .error(createError.BadRequest("price must be at least 1000")),
  disCount: joi
    .number()
    .error(createError.BadRequest("discount is not correct")),
  //image
  fileName: joi
    .string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createError.BadRequest("image extantion is not correct")),
  fileUploadPath: joi.allow(),
  // role of user
  type: joi
    .string()
    .regex(/(free|cash|premium)/i)
    .error(createError.BadRequest("Type of course is not correct")),
  image: joi.allow(),
});

const createEpisodeSchema = joi.object({
  title: joi
    .string()
    .min(5)
    .error(createError.BadRequest("title is not correct")),
  text: joi
    .string()
    .min(5)
    .error(createError.BadRequest("text must be at least 5 letters")),
  type: joi
    .string()
    .regex(/(unlock|lock)/i)
    .error(createError.BadRequest("Type of episode is not correct")),
  chapterId: joi
    .string()
    .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .error(createError.BadRequest("ID of category is not correct")),
  courseId: joi
    .string()
    .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .error(createError.BadRequest("ID of course is not correct")),
    fileName: joi
    .string()
    .regex(/(\.mp4|\.avi|\.mkv|\.mpeg|\.mov)$/)
    .error(createError.BadRequest("video extantion is not correct")),
  fileUploadPath: joi.allow(),
})

module.exports = {
  createEpisodeSchema,
  createCourseSchema,
};
