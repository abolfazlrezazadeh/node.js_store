const {episodeController} = require("../../http/controller/admin/course/episode.controller");

const router = require("express").Router();

router.post("/add", episodeController.addNewEpisode);

module.exports = {
    episodeAdminApiRoute : router
}