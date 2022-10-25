const homeController = require("../../http/controller/api/home.controller");
const router = require("express").Router();


router.post("/" , homeController.idexPage);


module.exports = {
    homeRoutes : router
}
