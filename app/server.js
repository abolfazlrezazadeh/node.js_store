const {allRoutes} = require("./router/router");
module.exports = class Application {
  #express = require("express");
  #app = this.#express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutse();
    this.errorHandler();
  }
  configApplication() {
    const path = require("path");
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
  }
  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`connected on port ${PORT}`);
    });
  }
  configDatabase(DB_URL) {
    const mongoose = require("mongoose");
    //Set up default mongoose connection
    mongoose.connect(DB_URL, (error) => {
      if (error) throw error;
      console.log(`connected to db successfully ....`);
    });
  }
  createRoutse() {
    // this.#app.get("/", (req, res, next) => {
    //   return res.json({ message: " this is main page " });
    // });
    this.#app.use(allRoutes);
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "the page not found",
      });
    });
    this.#app.use((error, req, res, next) => {
      const status = error?.status || 500;
      const message = error?.message || "InternalServerMessage";
      return res.status(status).json({ status, message, success: false });
    });
  }
};