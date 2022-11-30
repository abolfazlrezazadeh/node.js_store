const application = require("./app/server");
const DB_URI = "mongodb://127.0.0.1:27017/NodeJsStore";
// require("dotenv").config();
new application(3050 , DB_URI);