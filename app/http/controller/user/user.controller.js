const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createError = require("http-errors");
const controller = require("../controller");
const { userModel } = require("../../../model/users");

class userController extends controller {
  async getAllUsers(req, res, next) {
    try {
        const search = req?.query?.search || "";
        console.log(search);
      let users;
      if (search) {
        users = await userModel.find({
          $text: {
            $search: new RegExp(search, "ig"),
          },
        });
      } else {
        users = await userModel.find({});
      }
    //   const users = await userModel.find({});
      return res.status(httpStatus.OK).json({
        statasCode: httpStatus.OK,
        data: {
          users,
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
