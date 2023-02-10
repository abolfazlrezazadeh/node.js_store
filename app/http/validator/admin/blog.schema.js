const joi = require("@hapi/joi");
const createError = require("http-errors");
const createBlogSchema = joi.object({
  title: joi
    .string()
    .min(2)
    .max(40)
    .error(createError.BadRequest("the title must be at least 2 ")),
  text: joi.string().min(10).error(createError.BadRequest("the text does not correct")),
  shortText: joi.string().min(5).error(createError.BadRequest("the shortText does not correct")),
  image: joi.string().error(createError.BadRequest("the image is not correct")),
  tags: joi
    .array()
    .min(0)
    .max(20)
    .error(createError.BadRequest("the tags must be maximum 20")),
  category: joi
    .string()
    .pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .error(createError.BadRequest("the category is not correct")),
});
const updateBlogSchema = joi.object({
  text: joi.string().min(10).error(createError.BadRequest("the text does not correct")),
});

module.exports = {
    createBlogSchema
}
