const createHttpError = require("http-errors");
const { premissionModel } = require("../../model/premission");
const { roleModel } = require("../../model/role");
const { PERMISSIONS } = require("../../utils/constants");

function checkPremission(requiredPremissions = []) {
  return async function (req, res, next) {
    try {
      const user = req.user;
      const role = await roleModel.findOne({ title: user.role });
      const permissions = await premissionModel.find({
        _id: { $in: role.premissions },
      });
      const userPremissions = permissions.map((item) => item.name);
      const hasPremission = requiredPremissions.every((premission) => {
        return userPremissions.includes(premission);
      });
      if (userPremissions.includes(PERMISSIONS.ALL)) return next();
      if (requiredPremissions.length == 0 || hasPremission) return next();
      throw createHttpError.Forbidden("you cant access this part of site");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports = {
  checkPremission,
};
