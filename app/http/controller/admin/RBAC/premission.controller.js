const { premissionModel } = require("../../../../model/premission");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const controller = require("../../controller");
const { addPremissiomSchema } = require("../../../validator/admin/RBAC.schema");
const { deleteInvalidPropertyInObject, copyObject } = require("../../../../utils/function");

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
  async removePremissionById(req, res, next) {
    try {
      const {id} = req.params;
      const premission = await this.findpremissionWithId(id);
      const premissionsDeleteResult = await premissionModel.deleteOne({_id : premission._id});
      if(premissionsDeleteResult.deletedCount == 0) throw createError.InternalServerError("premission was not deleted")
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message : "premission deleted successfully",
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
  async updatePremissionById(req, res, next) {
    try {
      const { id } = req.params;
      const premission = await this.findpremissionWithId(id);
      const data = copyObject(req.body);
      console.log(data);
      deleteInvalidPropertyInObject(data, []);
      const updateRoleResult = await premissionModel.updateOne(
        { _id: premission._id },
        {
          $set: data,
        }
      );
      if (updateRoleResult.modifiedCount == 0)
        throw createError.InternalServerError("The premission was not updated");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "premission updated successfully",
        },
      });
    } catch (error) {
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
  async findpremissionWithId(_id) {
    const premission = await premissionModel.findOne({ _id });
    if (!premission)
      throw createError.BadRequest("premission not found");
      return premission
  }
}

module.exports = {
  premissionController: new premissionController(),
};
