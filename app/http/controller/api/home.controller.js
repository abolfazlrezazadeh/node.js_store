const { authSchema } = require("../../validator/user/auth.schema");
const controller = require("../controller");
const createErrors = require("http-errors");
module.exports = new (class homeController extends controller {
  async idexPage(req, res, next) {
    try {
      return res.status(200).json({
        message: "index page",
      });
    } catch (error) {
      next(error);
    }
  }
})();
