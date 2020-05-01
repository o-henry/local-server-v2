"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var jejuSchema = new _mongoose.Schema({
  location: {
    type: String,
    required: true,
    minlength: 1
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
var _default = jejuSchema;
exports["default"] = _default;