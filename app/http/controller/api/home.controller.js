const controller = require("../controller");


module.exports = new class homeController extends controller {
        idexPage(req, res , next) {
            return res.status(200).json({
                message : "index page"
            })
        }
}