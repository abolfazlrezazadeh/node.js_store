const {
    roomController
  } = require("../../http/controller/support/rooms.controller");
  
  const router = require("express").Router();
  router.post("/add", roomController.addRoom);
  router.get("/list", roomController.getListOfrooms);
  
  module.exports = {
    roomAdminRoute: router,
  };
  