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
const addPremissiomSchema = joi.object({
  name: joi
    .string()
    .min(2)
    .max(30)
    .error(new Error("name of premission is not correct")),
    description: joi
    .string()
    .min(0)
    .max(100)
    .error(new Error("description of premission is not correct")),
});

module.exports = {
  addRoleSchema,
  addPremissiomSchema
};
