/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(179);


/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(180)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\bh-outline\\bhOutline.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(181)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1517473e/bhOutline.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 180:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});


	var _init = function _init(vm) {
	    $.bhFormOutline.show({
	        offset: {
	            right: vm.offsetRight,
	            top: vm.offsetTop
	        },
	        scrollOffsetTop: vm.scrollTop,
	        insertContainer: vm.formContainer
	    });
	    $.bhAffix({
	        hostContainer: vm.hostContainer,

	        fixedContainer: vm.hostContainer.find('.bh-form-outline'),

	        offset: {
	            top: vm.outlineOffsettop,
	            left: vm.outlineOffsetleft
	        }
	    });
	};

	exports.default = {
	    props: {
	        formContainer: Object,
	        hostContainer: Object,
	        offsetTop: {
	            default: 0
	        },
	        offsetRight: {
	            default: 16
	        },
	        scrollTop: {
	            default: $('header.bh-header-mini').outerHeight()
	        },
	        outlineOffsettop: {
	            default: 36
	        },
	        outlineOffsetleft: {
	            default: 0
	        }
	    },
	    methods: {
	        init: function init() {
	            _init(this);
	        }
	    },
	    ready: function ready() {
	        var _this = this;

	        this.$watch('formContainer', function (newVal) {
	            if (!newVal) {
	                return;
	            }

	            _this.init();
	        });
	    }
	};

/***/ },

/***/ 181:
/***/ function(module, exports) {

	module.exports = "\n<div></div>\n";

/***/ }

/******/ });