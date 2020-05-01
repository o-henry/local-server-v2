"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _schemas = require("@schemas/schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Jeju = _mongoose["default"].model("Jeju", _schemas.jejuSchema);

var _default = Jeju;
exports["default"] = _default;