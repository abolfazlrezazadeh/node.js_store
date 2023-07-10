const { premissionModel } = require("../../../../model/premission");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const controller = require("../../controller");
const { addPremissiomSchema } = require("../../../validator/admin/RBAC.schema");

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
  async createPremission(req, res, next) {
    try {
      const { name, description } = await addPremissiomSchema.validateAsync(req.body);
      console.log(req.body);
      await this.findpremissionWithName(name);
      const premission = await premissionModel.create({ name, description });
      if (!premission)
        throw createError.InternalServerError("creating premission is failed");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "creating premission is successfull",
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async findpremissionWithName(name) {
    const premission = await premissionModel.findOne({ name });
    if (premission)
      throw createError.BadRequest(
        "The desired premission has already been registered"
      );
  }
}

module.exports = {
  premissionController: new premissionController(),
};
