const joi = require("@hapi/joi");
const addCategorySchema = joi.object({
  title: joi.string().min(2).max(30).error(new Error("title is not correct")),
  parent: joi.string().allow('').pattern(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i).allow("").error(new Error("The entered ID is not correct")),
});
const updateCategoryTitle = joi.object({
  title: joi.string().min(2).max(30).error(new Error("title is not correct")),
});

module.exports = {
    addCategorySchema,
    updateCategoryTitle
};
