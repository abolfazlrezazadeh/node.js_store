const createError = require("http-errors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
function createRoute(req) {
  const date = new Date();
  const year = date.getFullYear().toString();
  const months = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  const directory = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "uploads",
    "blogs",
    year,
    months,
    day
  );
  req.body.fileUploadPath = path.join("uploads", "blogs", year, months, day);
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file?.originalname) {
      const filePath = createRoute(req);
      return cb(null, filePath);
    }
    cb(null, null);
  },
  filename: (req, file, cb) => {
    if (file?.originalname) {
      const ext = path.extname(file?.originalname);
      const fileName = String(new Date().getTime() + ext);
      req.body.fileName = fileName;
      return cb(null, fileName);
    }
    cb(null, null);
  },
});
function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimtypes = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
  if (mimtypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("The picture sent is not correct"));
}
function videoFilter(req, file, cb) {
  const ext = path.extname(file.originalname);
  const mimtypes = [".mp4", ".avi", ".mkv", ".mov", ".mpeg"];
  if (mimtypes.includes(ext)) {
    return cb(null, true);
  }
  return cb(createError.BadRequest("video format is not correct"));
}
const uploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1000 * 1000 },
  //50mb max file size
});
const uploadVideo = multer({
  storage,
  videoFilter,
  limits: { fileSize: 300 * 1000 * 1000 },
  //300mb max file size
});
module.exports = {
  uploadFile,
  uploadVideo
};
