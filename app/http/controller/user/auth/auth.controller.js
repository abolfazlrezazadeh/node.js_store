const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validator/user/auth.schema");
const createErrors = require("http-errors");
const {
  randomNumberGenerator,
  signAccessToken,
  verfiyRefreshToken,
  signRefreshToken,
} = require("../../../../utils/function");
const { userModel } = require("../../../../model/users");
const {  roles } = require("../../../../utils/constants");
const controller = require("../../controller");

class userAuthController extends controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
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
      console.log(error);
      next(createErrors.BadRequest(error.message));
    }
  }

  async checkOtp(req, res, next) {
    try {
      await checkOtpSchema.validateAsync(req.body);
      const { phone, code } = req.body;
      const user = await userModel.findOne({ phone });
      if (!user) throw createErrors.NotFound("user was not found");
      if (user.otp.code != code)
        throw createErrors.Unauthorized("The entered code has incorrect");
      const now = Date.now();
      //changing data type to number with (+)
      if (+user.otp.expiresIn < now)
        throw createErrors.Unauthorized("The entered code has expired");
      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id); 
      return res.json({
        data: {
          accessToken,
          refreshToken
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next){
    try {
      const {refreshToken} = req.body;
      const phone = await verfiyRefreshToken(refreshToken);
      const user = await userModel.findOne({phone});
      const accessToken = await signAccessToken(user._id);
      const newRefreshToken = await signRefreshToken(user._id); 
      return res.json({
        data : {
          accessToken,
          refreshToken : newRefreshToken
        }
      })
    } catch (error) {
      next(error)
    }
  }

  //save user = if user exist update it
  //            if user was not exist create it
  async saveUser(phone, code) {
    let otp = {
      code,
      // 120.000 miliSeconds == 2 day
      expiresIn: (new Date().getTime() + 172800000),
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
      roles: [roles.user],
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
