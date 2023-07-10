const controller = require("../../controller");
const createError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { roleModel } = require("../../../../model/role");
const { addRoleSchema } = require("../../../validator/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");

class roleController extends controller {
  async getAllRoles(req, res, next) {
    try {
      const roles = await roleModel.find();
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          roles,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async createRole(req, res, next) {
    try {
      const { title, premissions } = await addRoleSchema.validateAsync(
        req.body
      );
      await this.findRoleWithTitle(title);
      const role = await roleModel.create({ title, premissions });
      if (!role)
        throw createError.InternalServerError("creating role is failed");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "creating role is successfull",
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async removeRole(req, res, next) {
    try {
      const { field } = req.params;
      const role = await this.findRoleWithIdOrTitle(field);
      const removeRoleResult = await roleModel.deleteOne({ _id: role._id });
      if (removeRoleResult.deletedCount == 0)
        throw createError.InternalServerError("The role was not deleted");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "Role deleted successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async findRoleWithIdOrTitle(field) {
    const query = mongoose.isValidObjectId(field)
      ? { _id: field }
      : { title: field };
    const role = await roleModel.find(query);
    if (!role) throw createError.NotFound("Role not found");
    return role[0];
  }
  async findRoleWithTitle(title) {
    const role = await roleModel.findOne({ title });
    if (role)
      throw createError.NotFound(
        "The desired role has already been registered"
      );
  }
}

module.exports = {
  roleController: new roleController(),
};
