const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
module.exports = class application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
      this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplocatiomn();
    this.connectToMongodb();
    this.createServer();
    // this.createRoutes();
    this.errorHandler();
  }
  configApplocatiomn() {
    this.#app.use(express.json);
    //can sent inputes in data form
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }
  connectToMongodb() {
    mongoose.connect(this.#DB_URI, (error) => {
      if (!error) return console.log("connected to MONGODB");
      return console.log("failed to connect to MONGODB");
    });
  }
  createRoutes() {
    this.#app.get("/", (req, res, next) => {
      return res.end({ message: "this is the main page " });
    });
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        message: "the page does not found",
      });
    });
    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500;
      const message = error?.message || "InternalServerError";
      return res.status(status).json({
        status,
        message,
      });
    });
  }
};

// module.exports = new application();
