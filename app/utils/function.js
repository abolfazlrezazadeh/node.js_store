const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/users");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constants");
function randomNumberGenerator() {
  return Math.floor(Math.random() * 90000);
}

function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userId);
    const payload = {
      phone: user.phone,
    };
    const options = {
      // 1 hour
      expiresIn: "1h",
    };
    jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError("server error"));
      resolve(token);
    });
  });
}
function signRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userId);
    const payload = {
      phone: user.phone,
    };
    const options = {
      // 1 YEAR
      expiresIn: "1y",
    };
    jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError("server error"));
      resolve(token);
    });
  });
}
async function verfiyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err) reject(createError.Unauthorized("login to your accoant"));
      const { phone } = payload || {};
      const user = await userModel.findOne(
        { phone },
        { password: 0, otp: 0, bills: 0 }
      );
      if (!user) reject(createError.Unauthorized("User account not found"));
      resolve(phone);
    });
  });
}

module.exports = {
  randomNumberGenerator,
  signAccessToken,
  signRefreshToken,
  verfiyRefreshToken
};
