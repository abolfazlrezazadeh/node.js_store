const createHttpError = require("http-errors");
const controller = require("../controller");

class paymentcontroller extends controller {
  async paymentGateWay(req, res, next) {
    try {
      const {user} = req.user;
      if(user?.basket?.courses.length == 0 && user?.basket?.courses.length == 0) throw createHttpError.BadRequest("")
      const zarinpal_request_url = "https://api.zarinpal.com/pg/v4/payment/request.json";
    } catch (error) {
      next(error);
    }
  }
}
module.exports = {
  paymentController: new paymentcontroller(),
};
