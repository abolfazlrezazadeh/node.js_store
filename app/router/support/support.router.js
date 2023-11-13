const { supportController } = require('../../http/controller/support/support.controller');
const { namespaceAdminRoute } = require('./namespace.router');
const { roomAdminRoute } = require('./room.router');

const router = require('express').Router()
router.use('/namespace', namespaceAdminRoute)
router.use('/room', roomAdminRoute)
router.post('/login', supportController.postLoginForm)
router.get('/login', supportController.getLoginForm)
router.get('/', supportController.renderFile)
// router.use("/namespace", namespaceAdminRoute);
module.exports = {
    supportSection : router
}