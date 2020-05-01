"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var locaCounts;
var isLocation = false;

var saveLocationToDB = function saveLocationToDB(_ref) {
  var uri = _ref.uri,
      schema = _ref.schema,
      location = _ref.location;

  _mongoose["default"].connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    schema.find().sort({
      _id: -1
    }).limit(10).then(function (res) {
      res.forEach(function (element) {
        element.location == location ? isLocation = true : '';
      });

      if (isLocation == false) {
        locaCounts = new schema({
          location: location
        });
        locaCounts.save(function (err) {});
      }
    });
  })["catch"](function (e) {
    return console.error("error", e);
  });
};

module.exports = saveLocationToDB;