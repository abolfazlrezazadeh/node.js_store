const joi = require("@hapi/joi");
const addRoleSchema = joi.object({
  title: joi
    .string()
    .min(2)
    .max(30)
    .error(new Error("title of role is not correct")),
  premissions: joi
    .array()
    .items(joi.string().pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i))
    .error(new Error("premissions of role is not correct")),
});

module.exports = {
  addRoleSchema,
};
