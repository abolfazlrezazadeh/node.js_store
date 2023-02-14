const createError = require("http-errors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { deleteFileInPublic } = require("./function");
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
    const filePath = createRoute(req);
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = String(new Date().getTime() + ext);
    req.body.fileName = fileName;
    cb(null, fileName);
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
const uploadFile = multer({
  storage,
  limits: { fileSize: 1 * 1000 * 1000 },
  //15mb max file size
  fileFilter,
});
module.exports = {
  uploadFile,
};
