const { authSchema } = require("../../../validator/user/auth.schema");
const createErrors = require("http-errors");
const { randomNumberGenerator } = require("../../../../utils/function");
const { userModel } = require("../../../../model/users");
const { expiresIn, roles } = require("../../../../utils/constants");
const controller = require("../../controller");

class userAuthController extends controller {
  async signIn(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
      const { phone } = req.body;
      const code = randomNumberGenerator();
      const result = await this.saveUser(phone, code);
      if (!result) throw createErrors.Unauthorized("Login failed");
      return res.status(200).send({
        data: {
          statusCode: 200,
          message: "Code sent successfully",
          code,
          phone,
        },
      });
    } catch (error) {
      next(createErrors.BadRequest(error.message));
    }
  }

  //save user = if user exist update it
  //            if user was not exist create it
  async saveUser(phone, code) {
    let otp = {
      code,
      // 120.000 miliSeconds == 2 minuts
      //in utils
      expiresIn: expiresIn,
    };
    const result = await this.checkExistUser(phone);
    if (result) {
      return await this.updateUser(phone, { otp });
    }
    //if !result
    //if created return true
    return !!(await userModel.create({
      phone,
      otp,
      //in utils
      roles: roles,
    }));
  }

  async checkExistUser(phone) {
    const user = await userModel.findOne({ phone });
    //if user exist return true
    return !!user;
  }

  async updateUser(phone, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if ([" ", "", "0", 0, null, undefined].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await userModel.updateOne(
      { phone },
      { $set: objectData }
    );
    //if updated return true
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  userAuthController: new userAuthController(),
};
