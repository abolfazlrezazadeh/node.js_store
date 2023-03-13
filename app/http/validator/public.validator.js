const joi = require("@hapi/joi");
const createError = require("http-errors");
const IdValidator = joi.object({
  id: joi
    .string()
    .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
    .error(createError.BadRequest("entered id is not correct")),
});

module.exports = {
    IdValidator,
  };
