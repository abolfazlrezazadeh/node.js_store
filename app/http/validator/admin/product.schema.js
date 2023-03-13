const joi = require("@hapi/joi");
const createError = require("http-errors");
const createProductSchema = joi.object({
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
  count: joi
    .number()
    .min(0)
    .error(createError.BadRequest("count must be at least 1")),
  disCount: joi
    .number()
    .error(createError.BadRequest("discount is not correct")),
  height: joi.string().empty().error(createError.BadRequest("height is not corect")),
  width: joi.string().empty().error(createError.BadRequest("width is not corect")),
  length: joi.string().empty().error(createError.BadRequest("length is not corect")),
  weight: joi.string().empty().error(createError.BadRequest("weight is not corect")),
  //image
  fileName: joi
    .string()
    .regex(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/)
    .error(createError.BadRequest("the image extantion is not correct")),
  fileUploadPath: joi.allow(),
  // role of user
  type: joi.string().regex(/(virtual|physical)/i).error(createError.BadRequest("Role of user is not correct")),
});


module.exports = {
  createProductSchema,
};
