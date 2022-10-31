const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/users");
const { SECRET_KEY } = require("./constants");
function randomNumberGenerator() {
  return Math.floor(Math.random() * 90000);
}

function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userId);
    const payload = {
      phone: user.phone,
      userId: user._id,
    };
    const secretKey = "";
    const options = {
      // 1 hour
      expiresIn: "1h",
    };
    jwt.sign(payload, SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError("server error"));
      resolve(token);
    });
  });
}

module.exports = {
  randomNumberGenerator,
  signAccessToken
};
