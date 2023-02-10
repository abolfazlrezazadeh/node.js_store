const multer = require("multer");
const path = require("path");
const fs = require("fs");
function createRoute() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const months = date.getMonth().toString();
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
  fs.mkdirSync(directory, { recursive: true });
  return directory;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = createRoute();
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = String(new Date().getTime() + ext);
    cb(null, fileName);
  },
});
const uploadFile = multer({ storage });
module.exports = {
  uploadFile,
};
