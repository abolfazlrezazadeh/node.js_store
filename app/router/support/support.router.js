const { supportController } = require('../../http/controller/support/support.controller')

const router = require('express').Router()
router.get('/', supportController.renderFile)
module.exports = {
    supportSection : router
}