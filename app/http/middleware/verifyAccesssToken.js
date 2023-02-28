const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constants");
const createError = require("http-errors");
const { userModel } = require("../../model/users");
const jwt = require("jsonwebtoken");

function getToken(headers) {
  const [Bearer, token] = headers?.["access-token"]?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(Bearer)) return token;
  throw createError.Unauthorized(
    "can not find accoant please login to your accoant"
  );
}

async function vrefiyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);
    jwt.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      try {
        if (err) throw createError.Unauthorized("login to your accoant");
        const { phone } = payload || {};
        const user = await userModel.findOne(
          { phone },
          { password: 0, otp: 0, bills: 0 }
        );
        if (!user) throw createError.Unauthorized("User account not found");
        req.user = user;
        return next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
}

function checkRole(role) {
  return function (req, res, next) {
    try {
      const user = req.user;
      if (user.roles.includes(role)) return next();
      throw createError.Unauthorized("you cant access this part of site");
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  vrefiyAccessToken,
  checkRole,
};
