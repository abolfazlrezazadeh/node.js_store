const controller = require("../controller");

class supportcontroller extends controller {
  renderFile(req, res, next) {
    try {
      return res.render("chat.ejs");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  supportController: new supportcontroller(),
};
