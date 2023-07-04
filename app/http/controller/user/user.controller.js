const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createError = require("http-errors");
const controller = require("../controller");
const { userModel } = require("../../../model/users");
const { deleteInvalidPropertyInObject } = require("../../../utils/function");

class userController extends controller {
  async getAllUsers(req, res, next) {
    try {
      const { search } = req.query;
      const databaseQuery = {};
      if (search) databaseQuery["$text"] = { $search: search };
      const users = await userModel.find(databaseQuery);
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const userId = req.user._id;
      const data = req.body;
      const blackListFields = [
        "phone",
        "courses",
        "otp",
        "bills",
        "disCount",
        "roles",
      ];
      deleteInvalidPropertyInObject(data, blackListFields);
      const updateUserResult = await userModel.updateOne(
        { _id: userId },
        { $set: data }
      );
      if (updateUserResult.modifiedCount == 0) {
        throw {
          status: httpStatus.INTERNAL_SERVER_ERROR,
          message: "internal server error",
        };
      }
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "User information has been updated",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  userController: new userController(),
};
