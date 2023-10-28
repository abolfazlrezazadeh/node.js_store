const {
  roomController,
} = require("../../http/controller/support/rooms.controller");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add", uploadFile.single("image"), roomController.addRoom);
router.get("/list", roomController.getListOfrooms);

module.exports = {
  roomAdminRoute: router,
};
