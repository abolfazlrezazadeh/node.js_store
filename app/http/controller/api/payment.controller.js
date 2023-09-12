const controller = require("../controller");

class paymentcontroller extends controller {
  async paymentGateWay(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  paymentController: new paymentcontroller(),
};
