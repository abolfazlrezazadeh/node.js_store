const { url } = require("inspector");
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
    const swaggerUI = require("swagger-ui-express");
    const swaggerJsDoc = require("swagger-jsdoc");
    const path = require("path");
    const cors = require("cors");
    //morgan is logging every requests
    //dev == in developing status
    this.#app.use(morgan("dev"));
    this.#app.use(cors())
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            info: {
              //name of the project
              title: "tomorrow shop",
              version: "1.0.0",
              description:
                "tomaorrow shop is the best store that provides physical and virtual products",
              contact: {
                name: "abolfazl rezazadeh",
                email: "raminrezazadeh687@gmail.com",
              },
            },
            servers: [
              {
                url: "http:localhost:3050",
              },
            ],
          },
          //apis in necessory
          // (**) => means all of the folders
          // (*) => means all of the files
          apis: ["./app/router/**/*.js"],
        })
      )
    );
  }
  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
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
