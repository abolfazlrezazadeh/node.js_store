const { allRoutes } = require("./router/router");
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
    const morgan = require("morgan");
    const path = require("path");
    //morgan is logging every requests
    //dev == in developing status
    this.#app.use(morgan("dev"));
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
    //for connecting to db
    mongoose.connection.on("connected", () => {
      console.log("connected");
    });
    //for disconnecting from mongoDB
    mongoose.connection.on("disconnect", () => {
      console.log("mongoose connection is disconnected");
    });
    //for disconnecting securely
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("disconnected");
      process.exit(0);
    });
  }
  createRoutse() {
    this.#app.use(allRoutes);
  }
  errorHandler() {
    const createErrors = require("http-errors");
    this.#app.use((req, res, next) => {
      next(createErrors.NotFound("the page not found"));
    });
    this.#app.use((error, req, res, next) => {
      const errorHandler = createErrors.InternalServerError();
      const status = error?.status || errorHandler.status;
      const message = error?.message || errorHandler.message;
      return res.status(status).json({
        errors: {
          status,
          message,
        },
      });
    });
  }
};
