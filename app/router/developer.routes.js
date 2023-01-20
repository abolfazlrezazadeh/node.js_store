const router = require("express").Router();
const bcrypt = require("bcrypt");
router.get("/password-hash/:{password}", (req, res, next) => {
    const {password} = req.params;
    const salt = 12 ;
    return res.send(bcrypt)
});
module.exports = {
  developerRoute: router,
};
