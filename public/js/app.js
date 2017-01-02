/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _WordSlider = __webpack_require__(1);
	
	var _WordSlider2 = _interopRequireDefault(_WordSlider);
	
	var _constants = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MainApp = function () {
		function MainApp() {
			_classCallCheck(this, MainApp);
	
			this._startTime = null;
			this._lastTick = 0;
			this._canvas = document.getElementById('word-slider');
			this._canvas.width = _constants.CANVAS_DIMENSIONS.width * _constants.PIXEL_RATIO;
			this._canvas.height = _constants.CANVAS_DIMENSIONS.height * _constants.PIXEL_RATIO;
			this._canvas.style.width = _constants.CANVAS_DIMENSIONS.width + 'px';
			this._canvas.style.height = _constants.CANVAS_DIMENSIONS.height + 'px';
			this._ctx = this._canvas.getContext('2d');
			this._isActive = true;
	
			this._wordSlider = new _WordSlider2.default();
			this._tick(0);
			this._wordSlider.start();
		}
	
		_createClass(MainApp, [{
			key: "_tick",
			value: function _tick(timeDelta, timestamp) {
				var _this = this;
	
				var req = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
	
				this.update(timeDelta, timestamp);
	
				req(function (timestamp) {
					_this._startTime = _this._startTime || timestamp;
					_this._tick(timestamp - _this._lastTick, timestamp);
					_this._lastTick = timestamp;
				});
			}
		}, {
			key: "update",
			value: function update(timeDelta, timestamp) {
				this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
				this._wordSlider.draw(this._ctx);
				this._wordSlider.update(timeDelta, timestamp);
			}
		}]);
	
		return MainApp;
	}();
	
	new MainApp();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Text = __webpack_require__(2);
	
	var _Text2 = _interopRequireDefault(_Text);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var WORD_LIST = ['Ricardo', 'Lorem', 'Junior', 'Gordinho', 'Gonçalo', 'Amilcar', 'Branquinha', 'Ivone', 'Igor'];
	
	var TIME_BETWEEN_TEXTS = 500;
	var OVERLAP_TIME_TEXTS = 300;
	
	var WordSlider = function () {
		function WordSlider() {
			_classCallCheck(this, WordSlider);
	
			this._isActive = false;
			this._startTime = null;
			this._currentText = 0;
			this._currentTime = 0;
			this._textArr = WordSlider.createTextArray();
		}
	
		_createClass(WordSlider, [{
			key: 'start',
			value: function start() {
				this._isActive = true;
				this._startTime = Date.now();
				this._currentText = 0;
				this._currentTime = 0;
				this._textArr[this._currentText].start();
			}
		}, {
			key: 'update',
			value: function update(timeDelta, timestamp) {
				if (this._isActive) {
					if (this._currentTime >= TIME_BETWEEN_TEXTS) {
						this._currentTime = 0;
						this._currentText = this._currentText + 1 === WORD_LIST.length ? 0 : this._currentText + 1;
						this._textArr[this._currentText].start();
					}
					this._currentTime += timeDelta;
					for (var i = 0; i < this._textArr.length; i++) {
						this._textArr[i].update(timeDelta, timestamp);
					}
				}
			}
		}, {
			key: 'draw',
			value: function draw(ctx) {
				for (var i = 0; i < this._textArr.length; i++) {
					this._textArr[i].draw(ctx);
				}
			}
		}], [{
			key: 'createTextArray',
			value: function createTextArray() {
				var arr = [];
				for (var i = 0; i < WORD_LIST.length; i++) {
					arr.push(new _Text2.default(WORD_LIST[i], { animDuration: TIME_BETWEEN_TEXTS + OVERLAP_TIME_TEXTS }));
				}
				return arr;
			}
		}]);
	
		return WordSlider;
	}();
	
	exports.default = WordSlider;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Property = __webpack_require__(3);
	
	var _Property2 = _interopRequireDefault(_Property);
	
	var _constants = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var POSITION = {
		x: 0,
		y: 0
	};
	
	var DEFAULT_OPTIONS = {
		animDuration: 1000
	};
	
	var Text = function () {
		function Text(text, options) {
			_classCallCheck(this, Text);
	
			this._startTime = null;
			this._currentTime = null;
	
			this._text = text;
			this._options = _extends({}, DEFAULT_OPTIONS, options);
			this._canvas = document.createElement('canvas');
			this._canvas.width = _constants.CANVAS_DIMENSIONS.width * _constants.PIXEL_RATIO;
			this._canvas.height = _constants.CANVAS_DIMENSIONS.height * _constants.PIXEL_RATIO;
			this._ctx = this._canvas.getContext('2d');
			this._ctx.font = "40px/1.0 ArialBlack";
			this._ctx.lineJoin = 'miter';
			this._ctx.miterLimit = 10;
			this._ctx.textAlign = 'center';
			this._ctx.textBaseline = 'alphabetic';
	
			this._textWidth = _constants.CANVAS_DIMENSIONS.width;
	
			this._isActive = false;
			this._opacity = new _Property2.default({ reverseLoop: true, loop: true, duration: this._options.animDuration / 2 });
			this._scale = new _Property2.default({ start: 0, duration: this._options.animDuration });
		}
	
		_createClass(Text, [{
			key: "start",
			value: function start() {
				this._isActive = true;
				this._opacity.start();
				this._scale.start();
				this._startTime = null;
			}
		}, {
			key: "update",
			value: function update(timeDelta, timestamp) {
				if (this._isActive) {
					this._startTime = this._startTime || timestamp;
					this._currentTime += timeDelta;
					if (this._currentTime > this._options.animDuration) {
						this._isActive = false;
						this._currentTime = 0;
					}
					this._opacity.update(timeDelta, timestamp);
					this._scale.update(timeDelta, timestamp);
				}
			}
		}, {
			key: "draw",
			value: function draw(ctx) {
				if (this._isActive) {
					var scale = this._scale.getCurrentValue();
	
					this._ctx.save();
					this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
					this._ctx.translate(this._textWidth, 80);
					this._ctx.scale(_constants.PIXEL_RATIO * scale, _constants.PIXEL_RATIO * scale);
					this._ctx.translate(0, 12);
					this._ctx.globalAlpha = this._opacity.getCurrentValue();
					this._ctx.fillText(this._text, 0, 0, this._textWidth);
					this._ctx.restore();
					ctx.drawImage(this._canvas, 0, 0, this._canvas.width, this._canvas.height);
				}
			}
		}]);
	
		return Text;
	}();
	
	exports.default = Text;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DEFAULT_OPTIONS = {
		start: 0,
		end: 1,
		duration: 1000,
		direction: 1,
		loop: false,
		reverseLoop: false
	};
	
	var Property = function () {
		function Property(options) {
			_classCallCheck(this, Property);
	
			this._animOptions = _extends({}, DEFAULT_OPTIONS, options);
			this._elapsed = 0;
			this._currentDirection = this._animOptions.direction;
			this._currentValue = this._animOptions.start;
		}
	
		_createClass(Property, [{
			key: "update",
			value: function update(timeDelta) {
				if (this._isActive) {
					this._tick(timeDelta);
				}
			}
		}, {
			key: "start",
			value: function start() {
				this._isActive = true;
				this._elapsed = 0;
				this._currentValue = this._animOptions.start;
				this._currentDirection = this._animOptions.direction;
			}
		}, {
			key: "getCurrentValue",
			value: function getCurrentValue() {
				return this._currentValue;
			}
		}, {
			key: "_tick",
			value: function _tick(timeDelta) {
				var options = this._animOptions;
	
				var value = void 0;
				var start = options.start,
				    end = options.end,
				    duration = options.duration,
				    loop = options.loop,
				    reverseLoop = options.reverseLoop;
	
	
				this._elapsed += timeDelta;
				value = (end - start) * (this._elapsed / duration);
	
				if (this._currentDirection < 1) {
					value = end - value;
					value = value <= start ? start : value;
				} else {
					value = start + value;
					value = value >= end ? end : value;
				}
	
				if (value === end || this._currentDirection < 1 && value === start) {
					if (loop) {
						if (reverseLoop) {
							this._currentDirection *= -1;
						}
					} else {
						this._isActive = false;
					}
					this._elapsed = 0;
				}
	
				this._currentValue = value;
			}
		}]);
	
		return Property;
	}();
	
	exports.default = Property;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var PIXEL_RATIO = exports.PIXEL_RATIO = function () {
		var ctx = document.createElement("canvas").getContext("2d"),
		    dpr = window.devicePixelRatio || 1,
		    bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
	
		return dpr / bsr;
	}();
	
	var CANVAS_DIMENSIONS = exports.CANVAS_DIMENSIONS = {
		width: 300,
		height: 100
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map