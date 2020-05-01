"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _models = require("@models/models");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jejuController = _express["default"].Router();
/**
 * GET/
 * retrieve and display all location tags in the Jeju Model
 */


jejuController.get('/', function (req, res, next) {
  _models.Jeju.find({}, function (err, result) {
    res.status(200).send('Check server');
  });
});
var _default = jejuController;
exports["default"] = _default;