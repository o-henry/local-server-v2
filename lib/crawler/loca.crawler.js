"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//@ts-nocheck
//@ts-ignore
require("@babel/register");

require("dotenv").config({
  path: "../../config/.env"
}); // const jejuSchema = require('../database/schemas/')


var saveLocationToDB = require('./save.locaTags.ts');

var puppeteer = require("puppeteer");

var jeju = "https://www.instagram.com/explore/tags/%EC%A0%9C%EC%A3%BC%EB%8F%84/";
var beforeClick, count, location;

var tab = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, pwd, url) {
    var browser, page;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            beforeClick = 0;
            count = 0;
            _context.next = 4;
            return puppeteer.launch({
              headless: false,
              devtools: true
            });

          case 4:
            browser = _context.sent;
            _context.next = 7;
            return browser.newPage();

          case 7:
            page = _context.sent;
            _context.prev = 8;
            _context.next = 11;
            return page["goto"]("https://www.instagram.com/accounts/login/");

          case 11:
            _context.next = 13;
            return page.waitForSelector('input[name="username"]');

          case 13:
            _context.next = 15;
            return page.type('input[name="username"]', id);

          case 15:
            _context.next = 17;
            return page.type('input[name="password"]', pwd);

          case 17:
            _context.next = 19;
            return page.click('button[type="submit"]');

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](8);
            console.log('인스타그램 에서 로그인을 차단했습니다.', _context.t0);

          case 24:
            _context.next = 26;
            return page.waitForSelector(".aOOlW.HoLwm");

          case 26:
            _context.next = 28;
            return page.click(".aOOlW.HoLwm");

          case 28:
            _context.next = 30;
            return page["goto"](url);

          case 30:
            _context.next = 32;
            return page.waitForSelector("article div a");

          case 32:
            _context.next = 34;
            return Promise.all([page.$eval("article div a", function (el) {
              return el.click();
            }), page.waitForNavigation()])["catch"](function (e) {
              return console.log(e);
            });

          case 34:
            if (!(beforeClick < 9)) {
              _context.next = 40;
              break;
            }

            _context.next = 37;
            return page.click("._65Bje.coreSpriteRightPaginationArrow");

          case 37:
            beforeClick++;
            _context.next = 34;
            break;

          case 40:
            if (!(count < 10)) {
              _context.next = 61;
              break;
            }

            _context.prev = 41;
            _context.next = 44;
            return page.waitForSelector(".M30cS", {
              timeout: 1000
            });

          case 44:
            _context.next = 46;
            return page.evaluate(function () {
              var div = document.querySelector(".M30cS").textContent;
              return div;
            });

          case 46:
            location = _context.sent;
            _context.next = 55;
            break;

          case 49:
            _context.prev = 49;
            _context.t1 = _context["catch"](41);
            console.log("로케이션 태그가 존재하지 않습니다.", _context.t1);

            if (location !== "") {
              saveLocationToDB(process.env.MONGO_URL_JEJU, jejuSchema, location);
            }

            _context.next = 55;
            return page.click("._65Bje.coreSpriteRightPaginationArrow");

          case 55:
            _context.next = 57;
            return page.click("._65Bje.coreSpriteRightPaginationArrow");

          case 57:
            saveLocationToDB(process.env.MONGO_URL_JEJU, jejuSchema, location);
            count++;
            _context.next = 40;
            break;

          case 61:
            _context.next = 63;
            return page.waitFor(25000);

          case 63:
            browser.close();

          case 64:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 21], [41, 49]]);
  }));

  return function tab(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}(); // 크롤러 실행


tab(process.env.INSTA_ID, process.env.INSTA_PASSWORD, jeju);