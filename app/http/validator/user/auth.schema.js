const joi = require("@hapi/joi");
const authSchema = joi.object({
    email : joi.string().trim().email().lowercase().required(),
    password : joi.string().trim().min(6).max(16).required()
});

module.exports = {
    authSchema
}
