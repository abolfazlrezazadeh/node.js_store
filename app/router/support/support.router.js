const { supportController } = require('../../http/controller/support/support.controller');
const { namespaceAdminRoute } = require('./namespace.router');

const router = require('express').Router()
router.get('/', supportController.renderFile)
// router.use("/namespace", namespaceAdminRoute);
module.exports = {
    supportSection : router
}