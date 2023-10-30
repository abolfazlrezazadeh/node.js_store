const { allRoutes } = require("./router/router");
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");
const expressEjsLayout = require("express-ejs-layouts");
const cors = require("cors");
const { initialSocket } = require("./utils/socket_Init");
const { socketHandler } = require("./socket.io");
module.exports = class Application {
  #app = express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.redis_init();
    this.configApplication();
    this.initTemplateEngine();
    this.createServer(PORT);
    this.createRoutse();
    this.errorHandler();
  }
  configApplication() {
    this.#app.use(cors());
    //morgan is logging every requests
    //dev == in developing status
    this.#app.use(morgan("dev"));
    // this.#app.use(bodyParser.urlencoded({ parameterLimit: 100000, limit: '50mb', extended: false }));
    this.#app.use(express.json());
    this.#app.use(
      express.urlencoded({
        parameterLimit: 100000,
        limit: "50mb",
        extended: false,
      })
    );
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            // openapi: "3.0.0",
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
            // components: {
            //   securitySchemes: {
            //     BearerAuth: {
            //       type: "http",
            //       scheme: "bearer",
            //       bearerFormat: "JWT",
            //     },
            //   },
            // },
            security: [{ BearerAuth: [] }],
          },
          //apis in necessory
          // (**) => means all of the folders
          // (*) => means all of the files
          apis: ["./app/router/**/*.js"],
        })
        // { explorer: true }
      )
    );
  }
  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    const io = initialSocket(server);
    socketHandler(io);
    server.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  }
  redis_init() {
    require("./utils/redis_init");
  }
  initTemplateEngine() {
    this.#app.use(expressEjsLayout);
    this.#app.set("view engine", "ejs");
    this.#app.set("views", path.join(__dirname, "..", "resource/views"));
    // code css in template Engine
    this.#app.set("layout extractStyles", true);
    // code javaScripts in template Engine
    this.#app.set("layout extractScripts", true);
    this.#app.set("layout", "./layouts/master");
  }
  configDatabase(DB_URL) {
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false);
    //Set up default mongoose connection
    mongoose.connect(DB_URL, (error) => {
      if (error) throw error;
      console.log(`connected to db successfully ....`);
    });
    //for connecting to db
    mongoose.connection.on("connected", () => {
      // console.log("connected");
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
      next(createErrors.NotFound("page not found"));
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
