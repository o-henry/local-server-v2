"use strict";

var _express = _interopRequireDefault(require("express"));

var _controller = require("controller");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config({
  path: "./config/.env"
});

var app = (0, _express["default"])(); // use all controller(APIs) here (Routing)

app.use("/", _controller.jejuController); // Start Server here

app.listen(8080, function () {
  console.log("Server is running on port 8080!");

  if (process.env.MONGO_URL_JEJU) {
    _mongoose["default"].connect(process.env.MONGO_URL_JEJU, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(function () {
      console.log('Connected to MongoDB');
    });
  }
});