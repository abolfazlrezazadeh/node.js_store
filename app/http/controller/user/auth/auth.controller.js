const { authSchema } = require("../../../validator/user/auth.schema");
const createErrors = require("http-errors");

class userAuthController {
  async signIn(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      return res.status(200).json({
        message: "you logged in successfully",
      });
    } catch (error) {
      next(createErrors.BadRequest(error.message));
    }
  }
}

module.exports = {
    userAuthController : new userAuthController
}