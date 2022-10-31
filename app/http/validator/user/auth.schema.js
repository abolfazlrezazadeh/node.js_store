const joi = require("@hapi/joi");
const getOtpSchema = joi.object({
    phone : joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("the phone number must be 9 characters"))
});
const checkOtpSchema = joi.object({
    phone : joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("phone number must be 9 characters")),
    code : joi.string().min(4).max(6).error(new Error("validation code is not correct"))
});

module.exports = {
    getOtpSchema,
    checkOtpSchema
}
