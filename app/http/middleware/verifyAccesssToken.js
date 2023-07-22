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
async function vrefiyAccessTokenInGraphQL(req, res) {
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
      } catch (error) {
        req.error = error
      }
    });
    if(Object.keys(req?.error || {})?.length) throw createError.Unauthorized()
  } catch (error) {
    console.log(error);
    throw createError.Unauthorized()
  }
}



module.exports = {
  vrefiyAccessToken,
  vrefiyAccessTokenInGraphQL
};
