const {
  ACCESS_TOKEN_SECRET_KEY} = require("../../utils/constants");
const createError = require("http-errors");
const { userModel } = require("../../model/users");
const jwt = require("jsonwebtoken");

async function vrefiyAccessToken(req, res, next) {
  const headers = req.headers;
  const [Bearer, token] = headers?.["access-token"]?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(Bearer)) {
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err) return next(createError.Unauthorized("login to your accoant"));
      const { phone } = payload || {};
      const user = await userModel.findOne(
        { phone },
        { password: 0, otp: 0, bills: 0 }
      );
      if (!user)
        return next(createError.Unauthorized("User account not found"));
      req.user = user;
      return next();
    });
  } else return next(createError.Unauthorized("login to your accoant"));
}

module.exports = {
  vrefiyAccessToken,
};
