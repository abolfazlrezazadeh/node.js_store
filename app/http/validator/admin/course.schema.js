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
  type: joi.string().regex(/(free|cash|premium)/i).error(createError.BadRequest("Type of course is not correct")),
  image : joi.allow()
});


module.exports = {
    createCourseSchema,
};
