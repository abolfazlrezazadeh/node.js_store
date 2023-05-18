const {episodeController} = require("../../http/controller/admin/course/episode.controller");
const { uploadVideo } = require("../../utils/multer");

const router = require("express").Router();

router.post("/add",  uploadVideo.single("video"), episodeController.addNewEpisode);

module.exports = {
    episodeAdminApiRoute : router
}