/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./View/carouselView.js":
/*!******************************!*\
  !*** ./View/carouselView.js ***!
  \******************************/
/*! exports provided: Carousel, Nav, Content, Button */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Nav\", function() { return Nav; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Content\", function() { return Content; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Button\", function() { return Button; });\n/* harmony import */ var _utlis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utlis.js */ \"./utlis.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Carousel =\n/*#__PURE__*/\nfunction () {\n  function Carousel(_ref) {\n    var navData = _ref.navData,\n        contentData = _ref.contentData,\n        buttonData = _ref.buttonData;\n\n    _classCallCheck(this, Carousel);\n\n    this.nav = navData;\n    this.content = contentData;\n    this.button = buttonData;\n    Object(_utlis_js__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(\"#slide\").innerHTML = this.templateRendering();\n  }\n\n  _createClass(Carousel, [{\n    key: \"templateRendering\",\n    value: function templateRendering() {\n      return \"\\n      \".concat(this.nav.template(), \"\\n      \").concat(this.content.template(), \"\\n      \").concat(this.button.template(), \"\\n    \");\n    }\n  }]);\n\n  return Carousel;\n}();\n\nvar Nav =\n/*#__PURE__*/\nfunction () {\n  function Nav(navData) {\n    _classCallCheck(this, Nav);\n\n    this.items = navData;\n  }\n\n  _createClass(Nav, [{\n    key: \"template\",\n    value: function template() {\n      var nav = this.items.reduce(function (render, list) {\n        return render += \"<li class=\\\"nav-content\\\">\".concat(list, \"</li>\");\n      }, \"\");\n      return \"<ul class=\\\"nav-container\\\">\".concat(nav, \"</ul>\");\n    }\n  }]);\n\n  return Nav;\n}();\n\nvar Content =\n/*#__PURE__*/\nfunction () {\n  function Content(contentData) {\n    _classCallCheck(this, Content);\n\n    this.items = contentData;\n  }\n\n  _createClass(Content, [{\n    key: \"template\",\n    value: function template() {\n      var modifyListArray = this.items.reduce(function (item, data) {\n        var content = data.content;\n        var li = content.map(function (list) {\n          return \"<li>\".concat(list, \"</li>\");\n        }).join(\"\");\n        item.push(_objectSpread({}, data, {\n          content: li\n        }));\n        return item;\n      }, []);\n      var contents = modifyListArray.reduce(function (render, list) {\n        return render += \"<li class=\\\"content\\\"><div><img src=\".concat(list.imgUrl, \"></div><div class=\\\"contents-content\\\"><h4>\").concat(list.title, \"</h4><ul>\").concat(list.content, \"</ul></div></li>\");\n      }, \"\");\n      return \"<div class=\\\"contents-container\\\"><ul class=\\\"contents\\\">\".concat(contents, \"</ul></div>\");\n    }\n  }]);\n\n  return Content;\n}();\n\nvar Button =\n/*#__PURE__*/\nfunction () {\n  function Button(buttonData) {\n    _classCallCheck(this, Button);\n\n    this.items = buttonData;\n  }\n\n  _createClass(Button, [{\n    key: \"template\",\n    value: function template() {\n      var buttons = this.items.reduce(function (render, button) {\n        return render += \"<button class=\".concat(button + \"Btn\", \"></button>\");\n      }, \"\");\n      return \"\".concat(buttons);\n    }\n  }]);\n\n  return Button;\n}();\n\n\n\n//# sourceURL=webpack:///./View/carouselView.js?");

/***/ }),

/***/ "./controller/carouselEvent.js":
/*!*************************************!*\
  !*** ./controller/carouselEvent.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utlis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utlis.js */ \"./utlis.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar CarouselEvent =\n/*#__PURE__*/\nfunction () {\n  function CarouselEvent() {\n    _classCallCheck(this, CarouselEvent);\n\n    this.menuBtn = Object(_utlis_js__WEBPACK_IMPORTED_MODULE_0__[\"$$\"])(\".nav-container li\");\n    this.dirBtn = Object(_utlis_js__WEBPACK_IMPORTED_MODULE_0__[\"$$\"])(\"#slide button\");\n    this.contentArea = Object(_utlis_js__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(\".contents\");\n    this.ListArea = Object(_utlis_js__WEBPACK_IMPORTED_MODULE_0__[\"$\"])(\".contents li\");\n    this.STARTINDEX = 1;\n    this.init();\n  }\n\n  _createClass(CarouselEvent, [{\n    key: \"init\",\n    value: function init() {\n      this.cloneEl();\n      this.setCss(this.STARTINDEX);\n      this.onEvent();\n      this.isTransition = false;\n    }\n  }, {\n    key: \"onEvent\",\n    value: function onEvent() {\n      this.addMenuEvent(this.menuBtn);\n      this.addButtonEvent(this.dirBtn);\n      this.contentEvent(this.contentArea);\n    }\n  }, {\n    key: \"cloneEl\",\n    value: function cloneEl() {\n      var firstChild = this.contentArea.firstChild;\n      var lastChild = this.contentArea.lastChild;\n      var firstClone = firstChild.cloneNode(true);\n      var lastClone = lastChild.cloneNode(true);\n      this.contentArea.appendChild(firstClone).classList.add('cloned');\n      this.contentArea.insertBefore(lastClone, firstChild).classList.add('cloned');\n    }\n  }, {\n    key: \"setCss\",\n    value: function setCss(index) {\n      this.menuBtn[index - 1].classList.add(\"selected\");\n      var listCount = this.contentArea.childElementCount;\n      var offsetWidth = listCount * this.ListArea.offsetWidth;\n      this.contentArea.style.width = offsetWidth + 'px';\n      this.contentArea.style.marginLeft = -this.ListArea.offsetWidth + 'px';\n      this.currentIndex = index;\n    }\n  }, {\n    key: \"addMenuEvent\",\n    value: function addMenuEvent(directBtn) {\n      var _this = this;\n\n      directBtn.forEach(function (target, index) {\n        target.addEventListener('click', function () {\n          _this.menuHandler(index);\n        });\n      });\n    }\n  }, {\n    key: \"menuHandler\",\n    value: function menuHandler(index) {\n      if (this.isTransition) return;\n      this.setCurrentIndex(index + 1);\n    }\n  }, {\n    key: \"addButtonEvent\",\n    value: function addButtonEvent(el) {\n      var _this2 = this;\n\n      el.forEach(function (el, index) {\n        el.addEventListener('click', function () {\n          _this2.btnHandler(index);\n        });\n      });\n    }\n  }, {\n    key: \"btnHandler\",\n    value: function btnHandler(index) {\n      if (this.isTransition) return;\n      index === 0 ? this.decreaseIndex() : this.increaseIndex();\n    }\n  }, {\n    key: \"increaseIndex\",\n    value: function increaseIndex() {\n      this.currentIndex < this.menuBtn.length + 1 ? this.setCurrentIndex(this.currentIndex + 1) : this.setCurrentIndex(0);\n    }\n  }, {\n    key: \"decreaseIndex\",\n    value: function decreaseIndex() {\n      this.currentIndex > 0 ? this.setCurrentIndex(this.currentIndex - 1) : this.setCurrentIndex(this.menuBtn.length - 1);\n    }\n  }, {\n    key: \"setCurrentIndex\",\n    value: function setCurrentIndex(index) {\n      if (this.isTransition || this.currentIndex === index) return;\n      this.isTransition = true;\n      this.selectMeun(this.currentIndex, index);\n      this.setContentArea(index);\n      this.currentIndex = this.convertIndex(this.menuBtn.length, index);\n    }\n  }, {\n    key: \"selectMeun\",\n    value: function selectMeun(currentIndex, index) {\n      var nextIndex = this.convertIndex(this.menuBtn.length, index);\n      this.menuBtn[currentIndex - 1].classList.remove('selected');\n      this.menuBtn[nextIndex - 1].classList.add('selected');\n    }\n  }, {\n    key: \"setContentArea\",\n    value: function setContentArea(index) {\n      this.contentArea.style.transition = \"margin-left 1s\";\n      var offsetWidth = -(index * this.ListArea.offsetWidth);\n      this.contentArea.style.marginLeft = offsetWidth + 'px';\n    }\n  }, {\n    key: \"convertIndex\",\n    value: function convertIndex(menuLength, index) {\n      var convertedIndex = 0;\n\n      if (menuLength < index) {\n        convertedIndex = 1;\n      } else if (1 > index) {\n        convertedIndex = this.menuBtn.length;\n      } else {\n        convertedIndex = index;\n      }\n\n      return convertedIndex;\n    }\n  }, {\n    key: \"contentEvent\",\n    value: function contentEvent(el) {\n      var _this3 = this;\n\n      el.addEventListener('transitionend', function () {\n        _this3.transitionEnd();\n      });\n    }\n  }, {\n    key: \"transitionEnd\",\n    value: function transitionEnd() {\n      this.isTransition = false;\n      this.contentArea.style.transition = 'none';\n      this.contentArea.style.marginLeft = -(this.currentIndex * this.ListArea.offsetWidth) + 'px';\n    }\n  }]);\n\n  return CarouselEvent;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CarouselEvent);\n\n//# sourceURL=webpack:///./controller/carouselEvent.js?");

/***/ }),

/***/ "./controller/controller.js":
/*!**********************************!*\
  !*** ./controller/controller.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _View_carouselView_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../View/carouselView.js */ \"./View/carouselView.js\");\n/* harmony import */ var _carouselEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carouselEvent.js */ \"./controller/carouselEvent.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar Controller =\n/*#__PURE__*/\nfunction () {\n  function Controller() {\n    _classCallCheck(this, Controller);\n\n    this.LOCALHOST_URL = 'http://127.0.0.1:4000';\n    this.init();\n  }\n\n  _createClass(Controller, [{\n    key: \"init\",\n    value: function init() {\n      this.fetchData();\n    }\n  }, {\n    key: \"fetchData\",\n    value: function fetchData() {\n      var _this = this;\n\n      if (localStorage.getItem('renderData')) {\n        this.renderTemplate(JSON.parse(JSON.parse(localStorage.getItem('renderData'))));\n        new _carouselEvent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n      } else {\n        fetch(this.LOCALHOST_URL).then(function (response) {\n          return response.json();\n        }).then(function (responseData) {\n          _this.renderTemplate(responseData);\n\n          _this.setLocalstorageData(JSON.stringify(responseData));\n\n          return responseData;\n        }).then(function () {\n          return new _carouselEvent_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        });\n      }\n    }\n  }, {\n    key: \"renderTemplate\",\n    value: function renderTemplate(renderData) {\n      new _View_carouselView_js__WEBPACK_IMPORTED_MODULE_0__[\"Carousel\"]({\n        \"navData\": new _View_carouselView_js__WEBPACK_IMPORTED_MODULE_0__[\"Nav\"](renderData.navData),\n        \"contentData\": new _View_carouselView_js__WEBPACK_IMPORTED_MODULE_0__[\"Content\"](renderData.contentData),\n        \"buttonData\": new _View_carouselView_js__WEBPACK_IMPORTED_MODULE_0__[\"Button\"](renderData.buttonData)\n      });\n    }\n  }, {\n    key: \"setLocalstorageData\",\n    value: function setLocalstorageData(data) {\n      localStorage.setItem(\"renderData\", JSON.stringify(data));\n    }\n  }]);\n\n  return Controller;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Controller);\n\n//# sourceURL=webpack:///./controller/controller.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../controller/controller.js */ \"./controller/controller.js\");\n\nwindow.addEventListener(\"DOMContentLoaded\", function () {\n  new _controller_controller_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n});\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ }),

/***/ "./utlis.js":
/*!******************!*\
  !*** ./utlis.js ***!
  \******************/
/*! exports provided: $, $$ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$\", function() { return $; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$$\", function() { return $$; });\nvar $ = function $(el) {\n  return document.querySelector(el);\n};\nvar $$ = function $$(el) {\n  return document.querySelectorAll(el);\n}; // 전역변수를 없애려고 객체를 활용 할 예정입니다 const hueyUtils = { $() {}, .....}\n\n//# sourceURL=webpack:///./utlis.js?");

/***/ })

/******/ });