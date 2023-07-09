const { premissionModel } = require("../../../../model/premission");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const controller = require("../../controller");

class premissionController extends controller {
  async getAllPremissions(req, res, next) {
    try {
      const premissions = await premissionModel.find({});
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          premissions,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  premissionController: new premissionController(),
};
