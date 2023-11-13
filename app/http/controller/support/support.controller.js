const { userModel } = require("../../../model/users");
const { signAccessToken } = require("../../../utils/function");
const controller = require("../controller");

class supportcontroller extends controller {
  renderFile(req, res, next) {
    try {
      return res.render("chat.ejs");
    } catch (error) {
      next(error);
    }
  }
  async postLoginForm(req, res, next) {
    try {
      const { mobile } = req.body;
      const user = await userModel.findOne({ phone: mobile });
      if (!user)
        return res.render("login.ejs", {
          error: "phon number is not correct",
        });
      const token = await signAccessToken(user._id);
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }
  getLoginForm(req, res, next) {
    try {
      return res.render("login.ejs", {
        error: undefined,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  supportController: new supportcontroller(),
};
