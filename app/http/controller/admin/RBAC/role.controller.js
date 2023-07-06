const controller = require("../../controller");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { roleModel } = require("../../../../model/role");

class roleController extends controller {
  async getAllRoles(req, res, next) {
    try {
      const roles = await roleModel.find().populate([{ path: "premissions" }]);
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          roles,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  roleController: new roleController(),
};
