const createHttpError = require("http-errors");
const { premissionModel } = require("../../model/premission");
const { roleModel } = require("../../model/role");

function checkPremission(requiredPremissions = []) {
  return async function (req, res, next) {
    try {
      const user = req.user;
      console.log(user);
      const role = await roleModel.findOne({ title: user.role });
      const permissions = await premissionModel.find({
        _id: { $in: role.premissions },
      });
      const userPremission = permissions.map((item) => item.name);
      console.log(requiredPremissions);
      console.log(userPremission);
      const hasPremission = requiredPremissions.every((premission) => {
        return userPremission.includes(premission);
      });
      if (requiredPremissions.length == 0 || hasPremission) return next();
      throw createHttpError.Forbidden("you cant access this part of site");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

module.exports ={
  checkPremission
}
