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
      await userModel.updateOne({phone : mobile},{$set : {token}})
      res.cookie("authorization", token, {
        signed: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 1 /* 1 day*/),
      });
      return res.redirect("/support");
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
