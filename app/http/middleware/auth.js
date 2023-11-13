const { userModel } = require("../../model/users");

async function checkLogin(req, res, next) {
  try {
    const token = req.signedCookies["authorization"];
    if (token) {
      const user = userModel.findOne({ token });
      if (user) {
        req.user = user;
        return next();
      }
    }
    return res.render("login.ejs", {
      error: "please login to your account ",
    });
  } catch (error) {
    next(error);
  }
}
async function checkAccess(req, res, next) {
  try {
    const token = req.signedCookies["authorization"];
    if (token) {
      const user = userModel.findOne({ token });
      if (user) {
        return res.redirect("/support");
      }
    }
    return next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkLogin,
  checkAccess
};
