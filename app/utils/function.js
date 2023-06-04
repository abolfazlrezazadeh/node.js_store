const path = require("path");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { userModel } = require("../model/users");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constants");
const redisClient = require("./redis_init");
function randomNumberGenerator() {
  return Math.floor(Math.random() * 90000);
}
async function signAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userId);
    const payload = {
      phone: user.phone,
    };
    const options = {
      // 1 hour
      expiresIn: "10d",
    };
    jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
      if (err) reject(createError.InternalServerError("server error"));
      resolve(token);
    });
  });
}
async function signRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await userModel.findById(userId);
    const payload = {
      phone: user.phone,
    };
    const options = {
      // 1 YEAR
      expiresIn: "10d",
    };
    jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, async (err, token) => {
      if (err) reject(createError.InternalServerError("server error"));
      await redisClient.SETEX(userId, 365 * 24 * 60 * 60, token);
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
      let refreshToken2;
      await redisClient.get(user._id, (err, value) => {
        if (err) {
          console.error("error: " + err);
        } else {
          refreshToken2 = value;
          // console.log(refreshToken2);
          if (token === refreshToken2) return resolve(phone);
          reject(createError.Unauthorized("logging-in is failed"));
          console.log("Worked: " + value);
        }
      });
      // console.log("refreshToken is : "+ refreshToken2);
    });
  });
}
async function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    fs.unlinkSync(pathFile);
  }
}
function quantificationOfFeauters(body) {
  const { height, width, length, weight, colors } = body;
  let feature = {};
  if (!feature.colors) feature.colors = [];
  feature.colors = colors;
  if (!height) feature.height = 0;
  else feature.height = height;
  if (!width) feature.width = 0;
  else feature.width = width;
  if (!length) feature.length = 0;
  else feature.length = length;
  if (!weight) feature.weight = 0;
  else feature.weight = weight;
  return feature;
}
function quantificationOfType(body) {
  let type;
  const { height, width, length, weight } = body;
  if (height || width || length || weight) {
    type = "physical";
  } else {
    type = "virtual";
  }

  return type;
}
function listOfImagesFromRequest(files, fileUploadPath, productBody /*req*/) {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, productBody.fileName))
      .map((item) => item.replace(/\\/g, "/"));
    // req.body.image = aks;
    // return aks;
  } else {
    return [];
  }
}
function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}
async function deleteSeveralFilseInPublic(files, callback) {
  try {
    files
      .map((image) => path.join(__dirname, "..", "..", "public", image))
      .forEach((path) => fs.existsSync(path) && fs.unlinkSync(path));
    // success code here
  } catch (err) {
    // error handling here
    console.error(err);
  }
}
function deleteInvalidPropertyInObject(data = {}, blackList = []) {
  let nullishData = ["", " ", "  ", "0", null, undefined, 0];
  Object.keys(data).forEach((key) => {
    if (blackList.includes(key)) delete data[key];
    if (typeof data[key] == "string") data[key] = data[key].trim();
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((item) => item.trim());
    //if array is empty dont update that field
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
}
function getTime(time) {
  let total = Math.round(time) / 60;
  let [min, percentage] = String(total).split(".");
  if (percentage == undefined) percentage = "0";
  let sec = Math.round((percentage.substring(0, 2) * 60) / 100);
  let hour = 0;
  if (min > 59) {
    total = min / 60;
    [hour, percentage] = String(total).split(".");
    if (percentage == undefined) percentage = "0";
    min = Math.round((percentage.substring(0, 2) * 60) / 100);
  }
  if (hour < 10) hour = `0${hour}`;
  if (min < 10) min = `0${min}`;
  if (sec < 10) sec = `0${sec}`;
  return hour + ":" + min + ":" + sec;
}
function gettalTimeOfCourses(chapters = []) {
  let time,
    hour,
    minute,
    seconds = 0;
  for (const chapter of chapters) {
    if (Array.isArray(chapter?.episodes)) {
      for (const episode of chapter.episodes) {
        if (episode?.time)time = episode.time.split(":"); //00:00:00
        else time = "00:00:00".split(":");
        if (time.length == 3) {
          seconds += Number(time[0]) * 3600; // convert hour to sdeconds
          seconds += Number(time[1]) * 60; // convert min to secs
          seconds += Number(time[2]);
        } else if (time.length == 2) {
          // 05:23
          seconds += Number(time[0]) * 60; // convert min to secs
          seconds += Number(time[1]);
        }
      }
    }
  }
  hour = Math.floor(seconds / 3600); // convert second to hour
  minute = Math.floor(seconds / 60) % 60; // convert sec to min
  seconds = Math.floor(seconds % 60); // sec to sec
  if (String(hour).length == 1) hour = `0${hour}`;
  if (String(minute).length == 1) minute = `0${minute}`;
  if (String(seconds).length == 1) seconds = `0${seconds}`;
  return hour + ":" + minute + ":" + seconds;
}

module.exports = {
  randomNumberGenerator,
  signAccessToken,
  signRefreshToken,
  verfiyRefreshToken,
  deleteFileInPublic,
  quantificationOfFeauters,
  quantificationOfType,
  listOfImagesFromRequest,
  copyObject,
  deleteSeveralFilseInPublic,
  deleteInvalidPropertyInObject,
  getTime,
  gettalTimeOfCourses,
};
